// Product Grid JavaScript Module for EgoMedi

/**
 * Product Grid Manager - Tạo và quản lý grid sản phẩm động
 */
class ProductGrid {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            columns: options.columns || { sm: 2, lg: 4 },
            gap: options.gap || 8,
            showPagination: options.showPagination || false,
            itemsPerPage: options.itemsPerPage || 8,
            ...options
        };
        this.products = [];
        this.currentPage = 1;
    }

    /**
     * Thiết lập dữ liệu sản phẩm
     * @param {Array} products - Mảng các sản phẩm
     */
    setProducts(products) {
        this.products = products;
        return this;
    }

    /**
     * Render grid sản phẩm
     */
    render() {
        if (!this.container) {
            console.error('Container not found');
            return;
        }

        let productsToShow;
        if (this.options.showPagination) {
            productsToShow = this.getPaginatedProducts();
        } else if (this.options.limitProducts) {
            productsToShow = this.products.slice(0, this.options.limitProducts);
        } else {
            productsToShow = this.products;
        }

        const gridHTML = this.generateGridHTML(productsToShow);
        this.container.innerHTML = gridHTML;

        if (this.options.showPagination) {
            this.renderPagination();
        }

        return this;
    }

    /**
     * Tạo HTML cho grid sản phẩm
     * @param {Array} products - Sản phẩm cần hiển thị
     */
    generateGridHTML(products) {
        const gridClasses = `grid grid-cols-1 sm:grid-cols-${this.options.columns.sm} lg:grid-cols-${this.options.columns.lg} gap-${this.options.gap}`;
        
        const productsHTML = products.map(product => this.generateProductCard(product)).join('');
        
        return `<div class="${gridClasses}">${productsHTML}</div>`;
    }

    /**
     * Tạo HTML cho một card sản phẩm
     * @param {Object} product - Thông tin sản phẩm
     */
    generateProductCard(product) {
        const discountHTML = product.originalPrice 
            ? `<span class="text-gray-400 line-through text-sm ml-2 font-montserrat">${this.formatPrice(product.originalPrice)}</span>`
            : '';

        return `
            <div class="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer product-item" 
                 data-product-id="${product.id}">
                <a href="../products/product-detail.html?id=${product.id}" class="block">
                    <div class="p-4">
                        <div class="h-60 flex items-center justify-center mb-3 bg-white relative overflow-hidden">
                            <img src="${product.image}" 
                                alt="${product.name}" 
                                class="w-[235x] h-[240px] object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
                                loading="lazy">
                            <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-20"></div>
                            <button class="cart-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 hover:bg-cyan-500 group/cart">
                                <i class="fas fa-shopping-basket text-gray-700 group-hover/cart:text-white transition-colors duration-300"></i>
                            </button>
                        </div>
                        <h3 class="text-gray-700 font-medium mb-3 font-montserrat text-center text-sm leading-tight">${product.name}</h3>
                        <div class="text-center">
                            <span class="text-gray-800 font-bold text-base font-montserrat">${this.formatPrice(product.price)}</span>
                            ${discountHTML}
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    /**
     * Tạo HTML cho rating
     * @param {number} rating - Điểm rating (1-5)
     */
    generateRatingHTML(rating) {
        const stars = Array.from({length: 5}, (_, i) => {
            const filled = i < Math.floor(rating);
            return `<i class="fas fa-star ${filled ? 'text-yellow-400' : 'text-gray-300'}"></i>`;
        }).join('');

        return `
            <div class="flex justify-center items-center mt-2 space-x-1">
                ${stars}
                <span class="text-gray-500 text-xs ml-1">(${rating})</span>
            </div>
        `;
    }

    /**
     * Format giá tiền
     * @param {number} price - Giá tiền
     */
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    }

    /**
     * Lấy sản phẩm theo phân trang
     */
    getPaginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.options.itemsPerPage;
        const endIndex = startIndex + this.options.itemsPerPage;
        return this.products.slice(startIndex, endIndex);
    }

    /**
     * Render phân trang
     */
    renderPagination() {
        if (!this.options.showPagination) return;

        const totalPages = Math.ceil(this.products.length / this.options.itemsPerPage);
        
        // Tìm pagination container
        const paginationContainer = document.getElementById('pagination-container');
        
        if (totalPages <= 1) {
            // Xóa pagination nếu chỉ có 1 trang
            if (paginationContainer) {
                paginationContainer.innerHTML = '';
            } else {
                this.removePagination();
            }
            return;
        }

        const paginationHTML = `
            <div class="flex justify-center space-x-2">
                ${this.generatePaginationButtons(totalPages)}
            </div>
        `;

        // Sử dụng pagination container có sẵn nếu có, nếu không thì tạo mới
        if (paginationContainer) {
            paginationContainer.innerHTML = paginationHTML;
        } else {
            // Xóa pagination cũ trước khi tạo mới (fallback cho trường hợp không có container)
            this.removePagination();
            
            const fallbackHTML = `
                <div class="pagination-wrapper flex justify-center mt-8 space-x-2">
                    ${this.generatePaginationButtons(totalPages)}
                </div>
            `;
            this.container.insertAdjacentHTML('afterend', fallbackHTML);
        }
    }

    /**
     * Tạo buttons phân trang
     * @param {number} totalPages - Tổng số trang
     */
    generatePaginationButtons(totalPages) {
        let buttons = '';
        
        // Previous button
        buttons += `
            <button class="pagination-btn px-3 py-2 rounded-lg border ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}" 
                    data-page="${this.currentPage - 1}" ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === this.currentPage;
            buttons += `
                <button class="pagination-btn px-3 py-2 rounded-lg border ${isActive ? 'bg-cyan-500 text-white' : 'hover:bg-gray-100'}" 
                        data-page="${i}">
                    ${i}
                </button>
            `;
        }

        // Next button
        buttons += `
            <button class="pagination-btn px-3 py-2 rounded-lg border ${this.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}" 
                    data-page="${this.currentPage + 1}" ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        return buttons;
    }

    /**
     * Thiết lập event listeners
     */
    setupEventListeners() {
        // Product click event for cart button
        this.container.addEventListener('click', (e) => {
            // If clicking on cart button, stop navigation and add to cart instead
            if (e.target.closest('.cart-btn')) {
                e.preventDefault();
                e.stopPropagation();
                
                const productItem = e.target.closest('.product-item');
                if (productItem) {
                    const productId = productItem.dataset.productId;
                    const product = this.products.find(p => p.id === productId);
                    
                    // Create product object for cart
                    const cartProduct = {
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price
                    };
                    
                    // Add to cart (if cart.js is loaded)
                    if (typeof addToCart === 'function') {
                        addToCart(cartProduct);
                    } else {
                        // Fallback if cart.js is not loaded
                        if (typeof showNotification === 'function') {
                            showNotification(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
                        } else {
                            alert(`Đã thêm ${product.name} vào giỏ hàng!`);
                        }
                    }
                }
                return;
            }
            
            // Handle regular product click (if not handled by the anchor tag)
            const productItem = e.target.closest('.product-item');
            if (productItem && !e.target.closest('a')) {
                const productId = productItem.dataset.productId;
                this.onProductClick(productId);
            }
        });

        // Pagination click event
        document.addEventListener('click', (e) => {
            if (e.target.closest('.pagination-btn')) {
                const page = parseInt(e.target.closest('.pagination-btn').dataset.page);
                if (page && page !== this.currentPage) {
                    this.goToPage(page);
                }
            }
        });

        return this;
    }

    /**
     * Chuyển trang
     * @param {number} page - Số trang
     */
    goToPage(page) {
        this.currentPage = page;
        this.render();
        
        // Scroll to top of grid
        this.container.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Xử lý khi click vào sản phẩm
     * @param {string} productId - ID sản phẩm
     */
    onProductClick(productId) {
        const product = this.products.find(p => p.id === productId);
        if (this.options.onProductClick) {
            this.options.onProductClick(product);
        } else {
            // Navigate to product detail page by default
            window.location.href = `product-detail.html?id=${productId}`;
        }
    }

    /**
     * Tìm kiếm sản phẩm
     * @param {string} query - Từ khóa tìm kiếm
     */
    search(query) {
        if (!query.trim()) {
            this.render();
            return;
        }

        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
        );

        const originalProducts = this.products;
        this.products = filteredProducts;
        this.currentPage = 1;
        this.render();
        this.products = originalProducts; // Restore original products
    }

    /**
     * Lọc sản phẩm theo category
     * @param {string} category - Danh mục
     */
    filterByCategory(category) {
        if (!category || category === 'all') {
            this.render();
            return;
        }

        const filteredProducts = this.products.filter(product => 
            product.category === category
        );

        const originalProducts = this.products;
        this.products = filteredProducts;
        this.currentPage = 1;
        this.render();
        this.products = originalProducts;
    }
}

// Dữ liệu sản phẩm mẫu (cập nhật để loại bỏ rating)
const medicalProducts = [
    {
        id: 'may-xong-mui-hong',
        name: 'Máy xông mũi họng',
        price: 1130000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/may-xong-mui-hong-beurer-ih26-duc-5d37bdc406a19-24072019090908-ced00d13-cf7f-4b2c-b1ad-1081447c94ea.jpg?v=1585558027640',
        category: 'medical-device',
        brand: 'beurer'
    },
    {
        id: 'khau-trang-vai',
        name: 'Khẩu trang vải xuất khẩu',
        price: 100000,
        originalPrice: 120000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/khau-trang-vai-khang-khuan-nagakawa-t4-b5e0c130-a26e-43d4-8c9e-cf0243b9442c.jpg?v=1585557895613',
        category: 'protection',
        brand: 'nagakawa'
    },
    {
        id: 'may-do-huyet-ap',
        name: 'Máy đo huyết áp cổ tay Đức',
        price: 800000,
        originalPrice: 900000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/may-do-huyet-ap-co-tay-beurer-bc30-6b297beb-3565-4c5e-bfbe-1c34b167f35d.jpg?v=1585510030550',
        category: 'medical-device',
        brand: 'beurer'
    },
    {
        id: 'con-rua-tay',
        name: 'Cồn rửa tay',
        price: 99000,
        originalPrice: 150000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/nuoc-rua-tay-kho-sat-khuan-dr-kovik-500ml-1-d1ebe3e0-246c-4961-ac3b-d72c82f8dfe0-364f065d-a3d1-4d79-992d-26f24cdc48e6.jpg?v=1585557952817',
        category: 'hygiene',
        brand: 'dr-kovik'
    },
    {
        id: 'nhiet-ke-dien-tu',
        name: 'Nhiệt kế điện tử',
        price: 350000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/ne-c801kd-1.jpg?v=1585510284053',
        category: 'thermometer',
        brand: 'omron'
    },
    {
        id: 'may-xong-mui-hong-omron',
        name: 'Máy xông mũi họng Omron',
        price: 1300000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/ne-c801kd-1.jpg?v=1585510284053',
        category: 'medical-device',
        brand: 'omron'
    },
    {
        id: 'may-do-duong-huyet',
        name: 'Máy đo đường huyết',
        price: 600000,
        originalPrice: 700000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/4975479417108.jpg?v=1585510012327',
        category: 'medical-device',
        brand: 'omron'
    },
    {
        id: 'nuoc-rua-tay-kho',
        name: 'Nước rửa tay khô sat khuẩn',
        price: 99000,
        originalPrice: 150000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/nuoc-rua-tay-kho-sat-khuan-dr-kovik-500ml-1.jpg?v=1585509678107',
        category: 'hygiene',
        brand: 'dr-kovik'
    },
    {
        id: 'nhiet-ke-hong-ngoai-bliss',
        name: 'Nhiệt kế hồng ngoại Bliss NC900P',
        price: 1450000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/may-do-nhiet-do-hong-ngoai-bliss-nc900p-1.jpg?v=1585510284053',
        category: 'thermometer',
        brand: 'bliss'
    },
    {
        id: 'nhiet-ke-xuat-su-duc',
        name: 'Nhiệt kế hồng ngoại xuất sứ Đức',
        price: 1280000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/may-do-nhiet-do-hong-ngoai-beurer-ft90-duc-1.jpg?v=1585510284053',
        category: 'thermometer',
        brand: 'beurer'
    },
    {
        id: 'nhiet-ke-do-tran',
        name: 'Nhiệt kế hồng ngoại đo trán',
        price: 1450000,
        image: '//bizweb.dktcdn.net/thumb/large/100/382/483/products/may-do-nhiet-do-hong-ngoai-do-tran-beurer-ft85-duc-1.jpg?v=1585510284053',
        category: 'thermometer',
        brand: 'beurer'
    }
];

// Export cho module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductGrid, medicalProducts };
}

// Initialize khi DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo product grid
    const productGrid = new ProductGrid('products-container', {
        columns: { sm: 2, lg: 4 },
        gap: 8,
        showPagination: false,
        limitProducts: 8, // Chỉ hiển thị 8 sản phẩm đầu tiên trên trang home
        onProductClick: function(product) {
            // Xử lý khi click vào sản phẩm
            console.log('Sản phẩm được chọn:', product);
            // Có thể mở modal, chuyển trang, etc.
        }
    });

    // Load dữ liệu và render
    productGrid
        .setProducts(medicalProducts)
        .render()
        .setupEventListeners();

    // Thiết lập search functionality
    const searchInput = document.querySelector('input[placeholder="Tìm sản phẩm khác..."]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            productGrid.search(this.value);
        });
    }
});
