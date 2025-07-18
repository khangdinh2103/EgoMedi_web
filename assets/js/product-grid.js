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

        const productsToShow = this.options.showPagination 
            ? this.getPaginatedProducts() 
            : this.products;

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
                <div class="p-4">
                    <div class="h-40 flex items-center justify-center mb-3 bg-white">
                        <img src="${product.image}" 
                             alt="${product.name}" 
                             class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                             loading="lazy">
                    </div>
                    <h3 class="text-gray-700 font-medium mb-3 font-montserrat text-center text-sm leading-tight">${product.name}</h3>
                    <div class="text-center">
                        <span class="text-gray-800 font-bold text-base font-montserrat">${this.formatPrice(product.price)}</span>
                        ${discountHTML}
                    </div>
                </div>
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
        if (totalPages <= 1) return;

        const paginationHTML = `
            <div class="flex justify-center mt-8 space-x-2">
                ${this.generatePaginationButtons(totalPages)}
            </div>
        `;

        this.container.insertAdjacentHTML('afterend', paginationHTML);
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
        // Product click event
        this.container.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            if (productItem) {
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
            console.log('Product clicked:', product);
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

// Dữ liệu sản phẩm mẫu
const medicalProducts = [
    {
        id: 'may-xong-mui-hong',
        name: 'Máy xông mũi họng',
        price: 1130000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_1.jpg?1705909553460',
        category: 'medical-device',
        rating: 4.5
    },
    {
        id: 'khau-trang-vai',
        name: 'Khẩu trang vải xuất khẩu',
        price: 100000,
        originalPrice: 120000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_2.jpg?1705909553460',
        category: 'protection',
        badge: 'Sale',
        rating: 4.2
    },
    {
        id: 'may-do-huyet-ap',
        name: 'Máy đo huyết áp cổ tay Đức',
        price: 800000,
        originalPrice: 900000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_3.jpg?1705909553460',
        category: 'medical-device',
        rating: 4.8
    },
    {
        id: 'nuoc-rua-tay',
        name: 'Nước rửa tay khô sát khuẩn',
        price: 39000,
        originalPrice: 150000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_4.jpg?1705909553460',
        category: 'hygiene',
        badge: 'Hot',
        rating: 4.0
    },
    {
        id: 'nhiet-ke-dien-tu',
        name: 'Nhiệt kế điện tử',
        price: 350000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_5.jpg?1705909553460',
        category: 'medical-device',
        rating: 4.3
    },
    {
        id: 'gang-tay-y-te',
        name: 'Găng tay y tế',
        price: 25000,
        originalPrice: 35000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_6.jpg?1705909553460',
        category: 'protection',
        rating: 4.1
    },
    {
        id: 'may-do-duong-huyet',
        name: 'Máy đo đường huyết',
        price: 650000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_7.jpg?1705909553460',
        category: 'medical-device',
        rating: 4.6
    },
    {
        id: 'tui-churom',
        name: 'Túi chườm nóng lạnh',
        price: 85000,
        originalPrice: 120000,
        image: '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/product_8.jpg?1705909553460',
        category: 'therapy',
        rating: 4.4
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
