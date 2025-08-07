// Cart Management JavaScript

// Initialize empty cart - will be loaded from localStorage
let cartItems = [];

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
    try {
        const savedCart = localStorage.getItem('egoMediCart');
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
            console.log('Loaded cart from storage:', cartItems);
        } else {
            // If no saved cart, start with empty cart
            cartItems = [];
            console.log('No saved cart found, starting with empty cart');
            
            // Add a sample product for testing (remove this in production)
            if (cartItems.length === 0) {
                const sampleProduct = {
                    id: 1,
                    name: "Cồn rửa tay khô",
                    image: "https://bizweb.dktcdn.net/thumb/medium/100/382/483/products/con-rua-tay-kho.jpg?v=1705634562000",
                    price: 99000,
                    quantity: 1
                };
                cartItems.push(sampleProduct);
                saveCartToStorage(); // Save the sample product
                console.log('Added sample product for testing');
            }
        }
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        cartItems = [];
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
    console.log('🔄 Rendering cart with items:', cartItems);
    const cartContainer = document.getElementById('cart-items');
    const cartContent = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartContainer) {
        console.error('❌ Cart container not found!');
        return;
    }
    
    if (cartItems.length === 0) {
        if (cartContent) cartContent.classList.add('hidden');
        if (emptyCart) emptyCart.classList.remove('hidden');
        return;
    }
    
    if (cartContent) cartContent.classList.remove('hidden');
    if (emptyCart) emptyCart.classList.add('hidden');
    
    // Generate cart items HTML
    const cartHTML = cartItems.map(item => {
        console.log(`Generating HTML for item:`, item);
        return `
        <div class="cart-item py-4 border-b border-gray-100 last:border-b-0" data-item-id="${item.id}">
            <!-- Mobile Layout (sm and below) -->
            <div class="sm:hidden">
                <div class="flex items-center">
                    <div class="w-20 h-20 flex-shrink-0 mr-4">
                        <img src="${item.image}" alt="${item.name}" 
                             class="w-full h-full object-cover rounded-md">
                    </div>
                    <div class="flex-1">
                        <h5 class="text-base font-medium text-gray-900">${item.name}</h5>
                        <p class="text-sm text-gray-600 mt-1">Giá: ${formatPrice(item.price)}</p>
                    </div>
                </div>
                
                <div class="flex justify-between items-center mt-3">
                    <div class="flex items-center">
                        <button class="quantity-decrease w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" 
                                data-item-id="${item.id}" type="button">
                            <i class="fas fa-minus text-xs text-gray-600"></i>
                        </button>
                        <span class="text-base font-medium mx-3">${item.quantity}</span>
                        <button class="quantity-increase w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" 
                                data-item-id="${item.id}" type="button">
                            <i class="fas fa-plus text-xs text-gray-600"></i>
                        </button>
                    </div>
                    
                    <button class="remove-item text-sm text-gray-500 hover:text-gray-700" 
                            data-item-id="${item.id}" type="button">
                        Xoá
                    </button>
                </div>
            </div>
            
            <!-- Desktop Layout (sm and above) -->
            <div class="hidden sm:flex items-center gap-4">
                <!-- Desktop layout remains unchanged -->
                <div class="flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-20 h-20 object-cover rounded-lg">
                </div>
                
                <div class="flex-1 min-w-0">
                    <h5 class="text-lg font-medium text-gray-900 mb-1">${item.name}</h5>
                    <p class="text-base text-gray-600">${formatPrice(item.price)}</p>
                </div>
                
                <div class="flex items-center gap-3 flex-shrink-0">
                    <button class="quantity-decrease w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200" 
                            data-item-id="${item.id}" type="button">
                        <i class="fas fa-minus text-sm text-gray-600"></i>
                    </button>
                    <span class="text-lg font-medium min-w-[30px] text-center">${item.quantity}</span>
                    <button class="quantity-increase w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200" 
                            data-item-id="${item.id}" type="button">
                        <i class="fas fa-plus text-sm text-gray-600"></i>
                    </button>
                </div>
                
                <div class="text-right min-w-[100px] flex-shrink-0">
                    <div class="text-lg font-semibold text-gray-900">
                        ${formatPrice(item.price * item.quantity)}
                    </div>
                </div>
                
                <button class="remove-item w-8 h-8 flex items-center justify-center transition-colors duration-200 ml-4 flex-shrink-0" 
                        data-item-id="${item.id}" type="button"
                        title="Xóa sản phẩm">
                    <i class="fas fa-times text-lg text-gray-400 hover:text-gray-600"></i>
                </button>
            </div>
        </div>
    `;
    }).join('');
    
    cartContainer.innerHTML = cartHTML;
    console.log('✅ Cart HTML rendered');
    
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

// Show notification (simple implementation)
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Simple alert for now - in a real app, this would be a toast notification
    if (type === 'success') {
        // You can replace this with a proper toast notification system
        console.log('✅ ' + message);
    } else if (type === 'warning') {
        console.log('⚠️ ' + message);
        alert(message);
    } else if (type === 'error') {
        console.log('❌ ' + message);
        alert(message);
    } else {
        console.log('ℹ️ ' + message);
        alert(message);
    }
}

// Update item price display without full re-render
function updateItemPrice(itemId, unitPrice, quantity) {
    const cartItem = document.querySelector(`.cart-item[data-item-id="${itemId}"]`);
    if (cartItem) {
        // Update quantity display for both mobile and desktop layouts
        // Mobile: text-xs font-medium min-w-[20px], Desktop: text-lg font-medium min-w-[30px]
        const quantitySpans = cartItem.querySelectorAll('span.text-xs.font-medium, span.text-lg.font-medium.min-w-\\[30px\\]');
        quantitySpans.forEach(span => {
            span.textContent = quantity;
        });
        
        // Update price display only for desktop layout (mobile doesn't show total price)
        const priceContainers = cartItem.querySelectorAll('.text-lg.font-semibold');
        priceContainers.forEach(container => {
            container.textContent = formatPrice(unitPrice * quantity);
        });
    }
}

// Update cart total
function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = formatPrice(total);
}

// Setup event listeners using event delegation to avoid duplicate bindings
function setupCartEventListeners() {
    console.log('Setting up cart event listeners...');
    
    // Use event delegation for cart item buttons to avoid duplicate event bindings
    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        // Remove existing listeners first
        cartContainer.removeEventListener('click', handleCartClick);
        
        // Add new listeners
        cartContainer.addEventListener('click', handleCartClick);
    }
    
    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'products/products.html';
        });
    }
    
    // Proceed to checkout button
    const checkoutBtn = document.getElementById('proceed-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length === 0) {
                showNotification('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.', 'warning');
                return;
            }
            
            // In a real application, this would redirect to checkout page
            showNotification('Chức năng thanh toán đang được phát triển!', 'info');
        });
    }
}

// Handle click events on cart items using event delegation
function handleCartClick(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const itemId = target.getAttribute('data-item-id');
    if (!itemId) return;
    
    // Parse ID properly
    let finalId = parseInt(itemId);
    if (isNaN(finalId)) {
        finalId = itemId; // Use as string if not a number
    }
    
    if (target.classList.contains('quantity-decrease')) {
        console.log('🔽 Decrease clicked for item:', finalId);
        updateQuantity(finalId, -1);
    } else if (target.classList.contains('quantity-increase')) {
        console.log('🔼 Increase clicked for item:', finalId);
        updateQuantity(finalId, 1);
    } else if (target.classList.contains('remove-item')) {
        console.log('❌ Remove clicked for item:', finalId);
        removeItem(finalId);
    }
}

// Update quantity by delta
function updateQuantity(itemId, delta) {
    console.log('Updating quantity for item:', itemId, '(type:', typeof itemId, ') delta:', delta);
    const item = cartItems.find(item => item.id == itemId); // Use == to compare both string and number
    if (item) {
        const newQuantity = item.quantity + delta;
        if (newQuantity > 0 && newQuantity <= 99) {
            item.quantity = newQuantity;
            
            // Update the quantity display directly
            updateItemPrice(itemId, item.price, newQuantity);
            
            // Update cart total
            updateCartTotal();
            
            // Save to storage
            saveCartToStorage();
            
            console.log('Quantity updated successfully');
            showNotification('Đã cập nhật số lượng sản phẩm', 'success');
        } else {
            console.log('Invalid quantity:', newQuantity);
        }
    } else {
        console.log('Item not found:', itemId, 'Available items:', cartItems.map(i => ({id: i.id, type: typeof i.id})));
    }
}

// Set specific quantity
function setQuantity(itemId, quantity) {
    console.log('Setting quantity for item:', itemId, '(type:', typeof itemId, ') to:', quantity);
    const item = cartItems.find(item => item.id == itemId); // Use == to compare both string and number
    if (item && quantity > 0 && quantity <= 99) {
        item.quantity = quantity;
        
        // Update the quantity display directly
        updateItemPrice(itemId, item.price, quantity);
        
        // Update cart total
        updateCartTotal();
        
        // Save to storage
        saveCartToStorage();
        
        showNotification('Đã cập nhật số lượng sản phẩm', 'success');
    } else {
        console.log('Item not found or invalid quantity:', {itemId, quantity, item});
    }
}

// Remove item from cart
function removeItem(itemId) {
    console.log('Removing item:', itemId, '(type:', typeof itemId, ')');
    const itemIndex = cartItems.findIndex(item => item.id == itemId); // Use == to compare both string and number
    if (itemIndex > -1) {
        const item = cartItems[itemIndex];
        
        // Show confirmation dialog
        if (confirm(`Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`)) {
            cartItems.splice(itemIndex, 1);
            saveCartToStorage();
            renderCart();
            console.log('Item removed successfully');
            showNotification('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
        }
    } else {
        console.log('Item not found for removal:', itemId, 'Available items:', cartItems.map(i => ({id: i.id, type: typeof i.id})));
    }
}

// Add item to cart (for use in other pages)
function addToCart(product) {
    console.log('Adding product to cart:', product);
    const existingItem = cartItems.find(item => item.id == product.id); // Use == to compare both string and number
    
    if (existingItem) {
        console.log('Product already exists, increasing quantity');
        existingItem.quantity += 1;
    } else {
        console.log('New product, adding to cart');
        cartItems.push({
            id: product.id, // Keep original ID type (string or number)
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1
        });
    }
    
    console.log('Cart after adding:', cartItems);
    saveCartToStorage();
    
    // If we're on the cart page, re-render to show new item with events
    if (document.getElementById('cart-items')) {
        console.log('Re-rendering cart after adding item');
        renderCart(); // This will show the new item, events are handled by delegation
    }
    
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
window.initCart = initCart;

// Test function to add a sample product (for debugging)
window.testAddProduct = function() {
    const testProduct = {
        id: 2,
        name: "Khẩu trang y tế",
        image: "https://bizweb.dktcdn.net/thumb/medium/100/382/483/products/khau-trang-y-te.jpg?v=1705634562000",
        price: 5000,
        quantity: 1
    };
    console.log('Testing add product...');
    addToCart(testProduct);
};

// Test function with string ID
window.testAddProductString = function() {
    const testProduct = {
        id: "khau-trang-vai", // String ID like the error shows
        name: "Khẩu trang vải",
        image: "https://bizweb.dktcdn.net/thumb/medium/100/382/483/products/khau-trang-vai.jpg?v=1705634562000",
        price: 3000,
        quantity: 1
    };
    console.log('Testing add product with string ID...');
    addToCart(testProduct);
};

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load cart data first
    loadCartFromStorage();
    
    // If we're on the cart page, initialize the full cart functionality
    if (document.getElementById('cart-items')) {
        console.log('Initializing cart page functionality');
        renderCart();
        setupCartEventListeners(); // This now sets up event delegation
        
        // Listen for cart updates from other pages
        window.addEventListener('cartUpdated', function(e) {
            console.log('Cart updated event received, re-rendering cart');
            loadCartFromStorage(); // Reload cart data
            renderCart(); // Re-render, events still work via delegation
        });
        
        // Listen for storage changes (when cart is updated from other tabs/pages)
        window.addEventListener('storage', function(e) {
            if (e.key === 'egoMediCart') {
                console.log('Storage change detected, re-rendering cart');
                loadCartFromStorage(); // Reload cart data
                renderCart(); // Re-render, events still work via delegation
            }
        });
    }
    
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
