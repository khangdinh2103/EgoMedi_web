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
            backgroundImage: options.backgroundImage || '//bizweb.dktcdn.net/100/382/483/themes/758809/assets/breadcrumb-bg.jpg?1705909553460',
            breadcrumbs: options.breadcrumbs || [],
            
            ...options
        };

        this.render();
    }

    /**
     * Render the breadcrumb banner
     */
    render() {
        const html = `
            <div class="relative w-full px-8 bg-blue-900 overflow-hidden">
                <!-- Background Image with Overlay -->
                <div class="absolute inset-0 z-0">
                    <img src="${this.options.backgroundImage}" 
                         alt="${this.options.currentPage}" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-opacity-70"></div>
                </div>
                
                <!-- Content -->
                <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
                    <div class="flex flex-col items-center md:items-start">
                        <!-- Title -->
                        <h1 class="text-3xl font-bold mb-4 text-center md:text-left font-montserrat">
                            ${this.options.currentPage}
                        </h1>
                        
                        <!-- Breadcrumb Navigation -->
                        <div class="flex items-center text-sm mb-6">
                            <a href="index.html" class="hover:text-cyan-300 transition-colors duration-300">
                                Trang chủ
                            </a>
                            ${this.options.breadcrumbs.map(crumb => `
                                <span class="mx-2">
                                    <i class="fas fa-chevron-right text-xs"></i>
                                </span>
                                <a href="${crumb.url}" class="hover:text-cyan-300 transition-colors duration-300">
                                    ${crumb.title}
                                </a>
                            `).join('')}
                            <span class="mx-2">
                                <i class="fas fa-chevron-right text-xs"></i>
                            </span>
                            <span class="text-cyan-300">${this.options.currentPage}</span>
                        </div>
                        
                       
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