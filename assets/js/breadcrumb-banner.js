/**
 * Breadcrumb Banner Component
 * Creates a reusable page header with breadcrumb navigation, title, and CTA button
 */
class BreadcrumbBanner {
    /**
     * Initialize the breadcrumb banner
     * @param {string} containerId - ID of the container element
     * @param {Object} options - Configuration options
     */
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID "${containerId}" not found.`);
            return;
        }

        // Default options
        this.options = {
            currentPage: options.currentPage || 'Trang hiện tại',
            description: options.description || '',
            backgroundImage: options.backgroundImage || '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/breadcrumb-bg.jpg?1705909553460',
            showButton: options.showButton !== undefined ? options.showButton : true,
            buttonText: options.buttonText || 'Đặt lịch ngay',
            buttonLink: options.buttonLink || '#',
            ...options
        };

        this.render();
    }

    /**
     * Render the breadcrumb banner
     */
    render() {
        const html = `
            <div class="relative w-full bg-blue-900 overflow-hidden">
                <!-- Background Image with Overlay -->
                <div class="absolute inset-0 z-0">
                    <img src="${this.options.backgroundImage}" 
                         alt="${this.options.currentPage}" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
                </div>
                
                <!-- Content -->
                <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
                    <div class="flex flex-col items-center md:items-start">
                        <!-- Title -->
                        <h1 class="text-4xl font-bold mb-4 text-center md:text-left font-montserrat">
                            ${this.options.currentPage}
                        </h1>
                        
                        <!-- Breadcrumb Navigation -->
                        <div class="flex items-center text-sm mb-6">
                            <a href="index.html" class="hover:text-cyan-300 transition-colors duration-300">
                                Trang chủ
                            </a>
                            <span class="mx-2">
                                <i class="fas fa-chevron-right text-xs"></i>
                            </span>
                            <span class="text-cyan-300">${this.options.currentPage}</span>
                        </div>
                        
                        <!-- Description Text -->
                        ${this.options.description ? `
                        <div class="text-gray-200 max-w-2xl text-center md:text-left mb-8 font-montserrat">
                            ${this.options.description}
                        </div>
                        ` : ''}
                        
                        <!-- CTA Button -->
                        ${this.options.showButton ? `
                        <a href="${this.options.buttonLink}" 
                           class="btn-blue-wave bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 inline-flex items-center font-montserrat">
                            ${this.options.buttonText}
                            <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    /**
     * Update the breadcrumb banner options
     * @param {Object} newOptions - New configuration options
     */
    update(newOptions = {}) {
        this.options = { ...this.options, ...newOptions };
        this.render();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make the component globally available
    window.BreadcrumbBanner = BreadcrumbBanner;
});