// Cart Management JavaScript

// Sample cart data - in real application, this would come from localStorage or API
let cartItems = [
    {
        id: 1,
        name: "Cồn rửa tay khô",
        image: "https://bizweb.dktcdn.net/thumb/medium/100/382/483/products/con-rua-tay-kho.jpg?v=1705634562000",
        price: 99000,
        quantity: 1
    }
];

// Initialize cart functionality
function initCart() {
    // Load cart from localStorage if available
    loadCartFromStorage();
    
    // Render cart
    renderCart();
    
    // Setup event listeners
    setupCartEventListeners();
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('egoMediCart');
    if (savedCart) {
        try {
            cartItems = JSON.parse(savedCart);
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            cartItems = [];
        }
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('egoMediCart', JSON.stringify(cartItems));
        
        // Update cart count in header if function exists
        if (typeof updateHeaderCartCount === 'function') {
            updateHeaderCartCount();
        }
        
        // Dispatch custom event for cart updates
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cartItems: cartItems, count: getCartCount() }
        }));
        
        // Also trigger storage event manually for same-page updates
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'egoMediCart',
            newValue: JSON.stringify(cartItems)
        }));
        
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartContent = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');
    
    if (cartItems.length === 0) {
        cartContent.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        return;
    }
    
    cartContent.classList.remove('hidden');
    emptyCart.classList.add('hidden');
    
    // Generate cart items HTML
    const cartHTML = cartItems.map(item => `
        <div class="cart-item border-b border-gray-200 last:border-b-0" data-item-id="${item.id}">
            <div class="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-20 h-20 object-cover rounded-lg border border-gray-200">
                </div>
                
                <!-- Product Info -->
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-medium text-gray-900 mb-1">${item.name}</h3>
                    <p class="text-gray-600 text-sm">Mã sản phẩm: SP${item.id.toString().padStart(3, '0')}</p>
                </div>
                
                <!-- Quantity Controls -->
                <div class="flex items-center border border-gray-300 rounded-md">
                    <button class="quantity-decrease px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200" 
                            data-item-id="${item.id}">
                        <i class="fas fa-minus text-sm"></i>
                    </button>
                    <input type="number" 
                           class="quantity-input w-16 text-center border-0 focus:ring-0 py-2" 
                           value="${item.quantity}" 
                           min="1" 
                           max="99"
                           data-item-id="${item.id}">
                    <button class="quantity-increase px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200" 
                            data-item-id="${item.id}">
                        <i class="fas fa-plus text-sm"></i>
                    </button>
                </div>
                
                <!-- Price -->
                <div class="text-right">
                    <div class="text-lg font-semibold text-gray-900">
                        ${formatPrice(item.price * item.quantity)}
                    </div>
                    <div class="text-sm text-gray-500">
                        ${formatPrice(item.price)} x ${item.quantity}
                    </div>
                </div>
                
                <!-- Remove Button -->
                <button class="remove-item text-red-500 hover:text-red-700 transition-colors duration-200 p-2" 
                        data-item-id="${item.id}"
                        title="Xóa sản phẩm">
                    <i class="fas fa-times text-lg"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    cartContainer.innerHTML = cartHTML;
    
    // Update cart total
    updateCartTotal();
}

// Format price to Vietnamese currency
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price).replace('₫', '₫');
}

// Update cart total
function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = formatPrice(total);
}

// Setup event listeners
function setupCartEventListeners() {
    const cartContainer = document.getElementById('cart-items');
    
    // Event delegation for cart actions
    cartContainer.addEventListener('click', function(e) {
        const itemId = parseInt(e.target.closest('[data-item-id]')?.getAttribute('data-item-id'));
        
        if (e.target.closest('.quantity-decrease')) {
            updateQuantity(itemId, -1);
        } else if (e.target.closest('.quantity-increase')) {
            updateQuantity(itemId, 1);
        } else if (e.target.closest('.remove-item')) {
            removeItem(itemId);
        }
    });
    
    // Handle direct quantity input
    cartContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity > 0 && newQuantity <= 99) {
                setQuantity(itemId, newQuantity);
            } else {
                // Reset to current quantity if invalid
                const item = cartItems.find(item => item.id === itemId);
                if (item) {
                    e.target.value = item.quantity;
                }
            }
        }
    });
    
    // Continue shopping button
    document.getElementById('continue-shopping').addEventListener('click', function() {
        window.location.href = 'products/products.html';
    });
    
    // Proceed to checkout button
    document.getElementById('proceed-checkout').addEventListener('click', function() {
        if (cartItems.length === 0) {
            showNotification('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.', 'warning');
            return;
        }
        
        // In a real application, this would redirect to checkout page
        showNotification('Chức năng thanh toán đang được phát triển!', 'info');
    });
}

// Update quantity by delta
function updateQuantity(itemId, delta) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0 && newQuantity <= 99) {
            item.quantity = newQuantity;
            saveCartToStorage();
            renderCart();
            showNotification('Đã cập nhật số lượng sản phẩm', 'success');
        }
    }
}

// Set specific quantity
function setQuantity(itemId, quantity) {
    const item = cartItems.find(item => item.id === itemId);
    if (item && quantity > 0 && quantity <= 99) {
        item.quantity = quantity;
        saveCartToStorage();
        renderCart();
        showNotification('Đã cập nhật số lượng sản phẩm', 'success');
    }
}

// Remove item from cart
function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        const item = cartItems[itemIndex];
        
        // Show confirmation dialog
        if (confirm(`Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`)) {
            cartItems.splice(itemIndex, 1);
            saveCartToStorage();
            renderCart();
            showNotification('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
        }
    }
}

// Add item to cart (for use in other pages)
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');
}

// Get cart count for header display
function getCartCount() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

// Update cart count in header
function updateCartCount() {
    const count = getCartCount();
    
    // Update header cart button with animation - support both span and a elements
    const cartButtons = document.querySelectorAll('.cart-button-mobile a, .cart-button-mobile span');
    cartButtons.forEach(button => {
        const oldText = button.textContent;
        const newText = `Giỏ hàng (${count})`;
        
        if (oldText !== newText) {
            button.textContent = newText;
            // Animation removed for better performance
        }
    });
    
    // Update any other cart count elements
    const cartCountElements = document.querySelectorAll('.cart-count, [data-cart-count]');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
    
    // Update header cart count if function exists
    if (typeof updateHeaderCartCount === 'function') {
        updateHeaderCartCount();
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
        cartItems = [];
        saveCartToStorage();
        renderCart();
        showNotification('Đã xóa tất cả sản phẩm trong giỏ hàng', 'success');
    }
}

// Export functions for global use
window.addToCart = addToCart;
window.getCartCount = getCartCount;
window.updateCartCount = updateCartCount;
window.clearCart = clearCart;

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load cart data first
    loadCartFromStorage();
    
    // Update cart count in header with delay to ensure header is loaded
    setTimeout(() => {
        updateCartCount();
        // Also call header update function if available
        if (typeof updateHeaderCartCount === 'function') {
            updateHeaderCartCount();
        }
    }, 100);
});

// Animation effects removed for better performance
