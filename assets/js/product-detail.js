// Product Detail JavaScript Module for EgoMedi

/**
 * Initialize the product detail page
 */
function initProductDetail() {
    // Get product ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('Product ID not found in URL');
        // Redirect to products page or show error
        window.location.href = '/';
        return;
    }

    // Find product in available products
    const product = medicalProducts.find(p => p.id === productId);

    if (!product) {
        console.error('Product not found with ID:', productId);
        // Show error message or redirect
        document.querySelector('main').innerHTML = `
            <div class="py-16 px-8 bg-white text-center">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Sản phẩm không tồn tại</h2>
                <p class="mb-6">Không tìm thấy sản phẩm bạn yêu cầu.</p>
                <a href="/" class="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full text-sm transition-all duration-300">
                    Quay lại trang chủ
                </a>
            </div>
        `;
        return;
    }

    // Update page title
    document.title = `${product.name} | EgoMedi`;

    // Update breadcrumb
    const breadcrumb = document.querySelector('#page-header');
    if (breadcrumb && typeof BreadcrumbBanner === 'function') {
        new BreadcrumbBanner('page-header', {
            currentPage: product.name,
            parentPages: [{ name: 'Sản phẩm', url: '/index.html' }],
            backgroundImage: 'https://bizweb.dktcdn.net/100/382/483/themes/758809/assets/bg_bread_crumb.jpg?1705634372536'
        });
    }

    // Update product details
    updateProductDetails(product);

    // Setup event listeners
    setupEventListeners(product);

    // Load related products
    loadRelatedProducts(product);
}

/**
 * Update product details on the page
 * @param {Object} product - The product object
 */
function updateProductDetails(product) {
    // Update main product image
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.image;
    mainImage.alt = product.name;

    // Generate thumbnail images
    const thumbnails = document.querySelector('.thumbnails');
    
    // For now, we'll just use the main image as the only thumbnail
    // In a real scenario, you'd have multiple images per product
    thumbnails.innerHTML = `
        <div class="thumbnail-item border border-cyan-500 rounded-lg p-2 cursor-pointer">
            <img src="${product.image}" alt="${product.name}" class="h-16 w-16 object-contain">
        </div>
    `;

    // If you had multiple images, you'd add them like this:
    if (product.images) {
        product.images.forEach(img => {
            thumbnails.innerHTML += `
                <div class="thumbnail-item border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-cyan-500">
                    <img src="${img}" alt="${product.name}" class="h-16 w-16 object-contain">
                </div>
            `;
        });
    }

    // Update product name
    document.getElementById('product-name').textContent = product.name;

    // Update product price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    document.getElementById('product-price').textContent = formatPrice(product.price);
    
    // Update original price if available
    const originalPriceElement = document.getElementById('product-original-price');
    if (product.originalPrice) {
        originalPriceElement.textContent = formatPrice(product.originalPrice);
        originalPriceElement.classList.remove('hidden');
    } else {
        originalPriceElement.classList.add('hidden');
    }

    // Update product description
    // In a real scenario, this would come from the product data
    document.getElementById('product-description').innerHTML = product.description || `
        <p>${product.name} là thiết bị y tế chất lượng cao, được sản xuất theo tiêu chuẩn quốc tế.</p>
        <p>Sản phẩm có độ bền cao, dễ sử dụng và mang lại hiệu quả tuyệt vời trong việc chăm sóc sức khỏe tại nhà.</p>
        <p>Phù hợp với mọi đối tượng người dùng, từ người già đến trẻ nhỏ.</p>
    `;

    // Update product details tab
    document.getElementById('tab-details').innerHTML = `
        <div class="prose max-w-none text-gray-600">
            <h3>Chi tiết về ${product.name}</h3>
            <p>Sản phẩm ${product.name} được nhập khẩu chính hãng, đảm bảo chất lượng và an toàn cho người sử dụng.</p>
            <p>Được sản xuất theo công nghệ hiện đại, sản phẩm mang lại hiệu quả cao và sự thoải mái cho người dùng.</p>
            <p>Thiết kế nhỏ gọn, dễ sử dụng và bảo quản, phù hợp với mọi gia đình.</p>
            <p>Đã được kiểm định và chứng nhận bởi các cơ quan y tế uy tín.</p>
        </div>
    `;

    // Update specifications tab
    const specsList = [
        { name: 'Xuất xứ', value: 'Nhập khẩu chính hãng' },
        { name: 'Thương hiệu', value: product.brand || 'EgoMedi' },
        { name: 'Bảo hành', value: '12 tháng' },
        { name: 'Loại sản phẩm', value: product.category === 'medical-device' ? 'Thiết bị y tế' : 
                                       product.category === 'protection' ? 'Thiết bị bảo hộ' :
                                       product.category === 'hygiene' ? 'Sản phẩm vệ sinh' : 'Khác' }
    ];

    const specsTable = document.querySelector('#tab-specs table tbody');
    specsTable.innerHTML = specsList.map(spec => `
        <tr>
            <td class="py-3 px-4 font-medium">${spec.name}</td>
            <td class="py-3 px-4">${spec.value}</td>
        </tr>
    `).join('');

    // Update reviews tab with some sample reviews
    document.getElementById('tab-reviews').innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-medium mb-4">Đánh giá từ khách hàng</h3>
            <div class="space-y-4">
                <div class="border-b pb-4">
                    <div class="flex items-center mb-2">
                        <div class="flex space-x-1 text-yellow-400">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <span class="ml-2 text-sm text-gray-600">5/5</span>
                    </div>
                    <p class="font-medium">Nguyễn Văn A</p>
                    <p class="text-sm text-gray-600 mt-1">Sản phẩm chất lượng tốt, giao hàng nhanh. Tôi rất hài lòng!</p>
                    <p class="text-xs text-gray-500 mt-2">Đánh giá vào ngày 15/06/2023</p>
                </div>
                <div class="border-b pb-4">
                    <div class="flex items-center mb-2">
                        <div class="flex space-x-1 text-yellow-400">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <span class="ml-2 text-sm text-gray-600">4/5</span>
                    </div>
                    <p class="font-medium">Trần Thị B</p>
                    <p class="text-sm text-gray-600 mt-1">Dùng rất tốt, giá cả phải chăng. Đóng gói cẩn thận.</p>
                    <p class="text-xs text-gray-500 mt-2">Đánh giá vào ngày 03/05/2023</p>
                </div>
            </div>
        </div>
        <div>
            <h3 class="text-lg font-medium mb-4">Viết đánh giá của bạn</h3>
            <form class="space-y-4">
                <div>
                    <label class="block mb-2 text-sm font-medium">Đánh giá của bạn</label>
                    <div class="flex space-x-1 text-gray-400 rating-select">
                        <i class="fas fa-star cursor-pointer hover:text-yellow-400"></i>
                        <i class="fas fa-star cursor-pointer hover:text-yellow-400"></i>
                        <i class="fas fa-star cursor-pointer hover:text-yellow-400"></i>
                        <i class="fas fa-star cursor-pointer hover:text-yellow-400"></i>
                        <i class="fas fa-star cursor-pointer hover:text-yellow-400"></i>
                    </div>
                </div>
                <div>
                    <label for="review-name" class="block mb-2 text-sm font-medium">Tên của bạn</label>
                    <input type="text" id="review-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
                </div>
                <div>
                    <label for="review-email" class="block mb-2 text-sm font-medium">Email</label>
                    <input type="email" id="review-email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500">
                </div>
                <div>
                    <label for="review-content" class="block mb-2 text-sm font-medium">Nội dung đánh giá</label>
                    <textarea id="review-content" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                </div>
                <div>
                    <button type="submit" class="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md text-sm transition-all duration-300">
                        Gửi đánh giá
                    </button>
                </div>
            </form>
        </div>
    `;
}

/**
 * Setup event listeners for the product detail page
 * @param {Object} product - The product object
 */
function setupEventListeners(product) {
    // Quantity buttons
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('product-quantity');

    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        
        // Create product object for cart
        const cartProduct = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price
        };
        
        // Add to cart (if cart.js is loaded)
        if (typeof addToCart === 'function') {
            // Add multiple quantities
            for (let i = 0; i < quantity; i++) {
                addToCart(cartProduct);
            }
        } else {
            // Fallback if cart.js is not loaded
            console.log(`Added ${quantity} ${product.name}(s) to cart`);
            if (typeof showNotification === 'function') {
                showNotification(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`, 'success');
            } else {
                alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
            }
        }
    });

    // Buy now button
    const buyNowBtn = document.getElementById('buy-now');
    buyNowBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        
        // Create product object for cart
        const cartProduct = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price
        };
        
        // Add to cart first (if cart.js is loaded)
        if (typeof addToCart === 'function') {
            // Add multiple quantities
            for (let i = 0; i < quantity; i++) {
                addToCart(cartProduct);
            }
            
            // Redirect to cart page
            setTimeout(() => {
                window.location.href = '../cart.html';
            }, 500);
        } else {
            // Fallback if cart.js is not loaded
            console.log(`Buy now: ${quantity} ${product.name}(s)`);
            if (typeof showNotification === 'function') {
                showNotification(`Đang chuyển đến trang thanh toán cho ${quantity} ${product.name}!`, 'info');
            } else {
                alert(`Đang chuyển đến trang thanh toán cho ${quantity} ${product.name}!`);
            }
        }
    });

    // Tab switching
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(el => {
                el.classList.remove('active', 'text-cyan-500', 'border-cyan-500');
                el.classList.add('border-transparent');
            });
            
            // Add active class to clicked tab
            link.classList.add('active', 'text-cyan-500', 'border-cyan-500');
            link.classList.remove('border-transparent');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show the selected tab content
            const tabId = link.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.remove('hidden');
        });
    });

    // Thumbnail image click
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');
    thumbnailItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove border from all thumbnails
            thumbnailItems.forEach(thumb => {
                thumb.classList.remove('border-cyan-500');
                thumb.classList.add('border-gray-200');
            });
            
            // Add border to clicked thumbnail
            item.classList.add('border-cyan-500');
            item.classList.remove('border-gray-200');
            
            // Update main image
            const imgSrc = item.querySelector('img').src;
            document.getElementById('main-product-image').src = imgSrc;
        });
    });

    // Review star rating
    const ratingStars = document.querySelectorAll('.rating-select i');
    ratingStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            // Update all stars
            ratingStars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('text-yellow-400');
                    s.classList.remove('text-gray-400');
                } else {
                    s.classList.remove('text-yellow-400');
                    s.classList.add('text-gray-400');
                }
            });
        });
    });
}

/**
 * Load related products
 * @param {Object} product - The current product
 */
function loadRelatedProducts(product) {
    // Get products from the same category
    const relatedProducts = medicalProducts.filter(p => 
        p.category === product.category && p.id !== product.id
    ).slice(0, 4); // Get up to 4 related products
    
    if (relatedProducts.length === 0) {
        // If no related products in the same category, get random products
        relatedProducts.push(...medicalProducts
            .filter(p => p.id !== product.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
        );
    }
    
    // Create a ProductGrid for related products
    const relatedProductsGrid = new ProductGrid('related-products-container', {
        columns: { sm: 2, lg: 4 },
        gap: 6,
        showPagination: false,
        onProductClick: function(product) {
            window.location.href = `product-detail.html?id=${product.id}`;
        }
    });
    
    // Load and render related products
    relatedProductsGrid
        .setProducts(relatedProducts)
        .render()
        .setupEventListeners();
}
