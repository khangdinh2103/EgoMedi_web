// Main JavaScript file for EgoMedi

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadHeader();
    loadFooter();
    
    // Initialize features
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initAnimations();
    initContactForm();
    
    console.log('EgoMedi website loaded successfully!');
});

// Load Header Component
async function loadHeader() {
    try {
        const response = await fetch('./components/header.html');
        const headerHTML = await response.text();
        document.getElementById('header').innerHTML = headerHTML;
        
        // Initialize mobile menu after header is loaded
        initMobileMenuEvents();
        
        // Set active menu item based on current page
        setActiveMenuItem();
    } catch (error) {
        console.error('Error loading header:', error);
        // Fallback header
        document.getElementById('header').innerHTML = `
            <header class="bg-white shadow-md">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center py-4">
                        <!-- Logo -->
                        <div class="flex-shrink-0">
                            <a href="index.html" class="flex items-center">
                                <img src="//bizweb.dktcdn.net/100/382/483/themes/758809/assets/logo.png?1705909553460" 
                                     alt="EgoMedi Logo" 
                                     class="h-12 w-auto">
                            </a>
                        </div>
                        
                        <!-- Navigation -->
                        <nav class="hidden md:flex space-x-8">
                            <a href="index.html" class="text-gray-700 hover:text-cyan-500 px-3 py-2 font-medium transition-colors duration-300">
                                Trang chủ
                            </a>
                            <a href="gioi-thieu.html" class="text-gray-700 hover:text-cyan-500 px-3 py-2 font-medium transition-colors duration-300">
                                Giới thiệu
                            </a>
                            <a href="#" class="text-gray-700 hover:text-cyan-500 px-3 py-2 font-medium transition-colors duration-300">
                                Dịch vụ
                            </a>
                            <a href="#" class="text-gray-700 hover:text-cyan-500 px-3 py-2 font-medium transition-colors duration-300">
                                Sản phẩm
                            </a>
                            <a href="#" class="text-gray-700 hover:text-cyan-500 px-3 py-2 font-medium transition-colors duration-300">
                                Tin tức
                            </a>
                            <a href="#" class="text-gray-700 hover:text-cyan-500 px-3 py-2 font-medium transition-colors duration-300">
                                Liên hệ
                            </a>
                        </nav>
                        
                        <!-- Mobile menu button -->
                        <div class="md:hidden">
                            <button type="button" class="text-gray-700 hover:text-cyan-500 focus:outline-none">
                                <i class="fas fa-bars text-2xl"></i>
                            </button>
                        </div>
                        
                        <!-- Contact Info -->
                        <div class="hidden lg:flex items-center space-x-4">
                            <div class="flex items-center">
                                <i class="fas fa-phone-alt text-cyan-500 mr-2"></i>
                                <span class="text-gray-700">+84 123 456 789</span>
                            </div>
                            <a href="#" class="btn-blue-wave bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1">
                                Đặt lịch ngay
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

// Set active menu item based on current page
function setActiveMenuItem() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Handle desktop navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemPage = item.getAttribute('data-page');
        const link = item.querySelector('a');
        
        // Check if this item matches the current page or its subpages
        if (
            currentPage === itemPage || 
            (currentPage.includes('product-') && itemPage === 'products.html') ||
            (currentPage.includes('appointment') && itemPage === 'appointment.html')
        ) {
            // Set active styles
            item.classList.remove('border-transparent'); // Remove transparent border
            item.classList.add('border-cyan-400'); // Add cyan border
            item.classList.add('active'); // Add active class for additional styling
            if (link) {
                link.classList.remove('text-gray-600');
                link.classList.add('text-cyan-400');
            }
        } else {
            // Reset styles
            item.classList.remove('border-cyan-400');
            item.classList.remove('active');
            item.classList.add('border-transparent');
            if (link) {
                link.classList.remove('text-cyan-400');
                link.classList.add('text-gray-600');
            }
        }
    });
    
    // Handle mobile navigation
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        const itemPage = item.getAttribute('data-page');
        const link = item.querySelector('a');
        
        // Check if this item matches the current page or its subpages
        if (
            currentPage === itemPage || 
            (currentPage.includes('product-') && itemPage === 'products.html') ||
            (currentPage.includes('appointment') && itemPage === 'appointment.html')
        ) {
            // Set active styles for mobile
            item.classList.add('active-mobile'); // Add active class for mobile
            
            if (link) {
                link.classList.add('text-cyan-500');
                link.classList.remove('text-gray-800');
                link.classList.add('font-bold');
            }
            
            // If it's a dropdown menu, expand it
            const submenu = item.querySelector('.mobile-submenu');
            const toggle = item.querySelector('.mobile-dropdown-toggle');
            if (submenu && toggle) {
                submenu.classList.remove('hidden');
                toggle.textContent = '-';
            }
            
            // Add a left border to highlight the active item in mobile
            const dot = item.querySelector('.w-2');
            if (dot) {
                dot.classList.remove('bg-cyan-400');
                dot.classList.add('bg-cyan-600');
                dot.classList.add('w-3', 'h-3'); // Make the dot slightly larger
            }
        } else {
            // Reset styles
            item.classList.remove('active-mobile');
            
            if (link) {
                link.classList.remove('text-cyan-500');
                link.classList.add('text-gray-800');
                link.classList.remove('font-bold');
            }
            
            // Reset the dot
            const dot = item.querySelector('.w-2, .w-3');
            if (dot) {
                dot.classList.remove('bg-cyan-600', 'w-3', 'h-3');
                dot.classList.add('bg-cyan-400', 'w-2', 'h-2');
            }
        }
    });
}

// Load Footer Component
async function loadFooter() {
    try {
        const response = await fetch('./components/footer.html');
        const footerHTML = await response.text();
        document.getElementById('footer').innerHTML = footerHTML;
    } catch (error) {
        console.error('Error loading footer:', error);
        // Fallback footer
        document.getElementById('footer').innerHTML = `
            <footer class="bg-gray-800 text-white pt-16 pb-8">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <!-- Column 1: About -->
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Về EgoMedi</h3>
                            <p class="text-gray-400 mb-4">
                                Phòng khám Đa khoa Y học Ego Medical Center mang tới cho người dân Hà Nội và các tỉnh lân cận một địa chỉ chăm sóc sức khỏe chuyên nghiệp và an toàn.
                            </p>
                            <div class="flex space-x-4 mt-4">
                                <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Column 2: Quick Links -->
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Liên kết nhanh</h3>
                            <ul class="space-y-2">
                                <li>
                                    <a href="index.html" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Trang chủ
                                    </a>
                                </li>
                                <li>
                                    <a href="gioi-thieu.html" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Giới thiệu
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Dịch vụ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Sản phẩm
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Tin tức
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Liên hệ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <!-- Column 3: Services -->
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Dịch vụ</h3>
                            <ul class="space-y-2">
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Tầm soát ung thư
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Khám tổng quát
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Xét nghiệm máu
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Xét nghiệm di truyền
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                        Tế bào học
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <!-- Column 4: Contact -->
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Liên hệ</h3>
                            <ul class="space-y-3">
                                <li class="flex items-start">
                                    <i class="fas fa-map-marker-alt mt-1 mr-3 text-cyan-500"></i>
                                    <span class="text-gray-400">123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-phone-alt mt-1 mr-3 text-cyan-500"></i>
                                    <span class="text-gray-400">+84 123 456 789</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-envelope mt-1 mr-3 text-cyan-500"></i>
                                    <span class="text-gray-400">info@egomedi.com</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-clock mt-1 mr-3 text-cyan-500"></i>
                                    <span class="text-gray-400">Thứ 2 - Thứ 7: 8:00 - 17:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2023 EgoMedi. Tất cả quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Initialize Mobile Menu
function initMobileMenu() {
    // Load the mobile-menu.js script dynamically
    if (!document.querySelector('script[src*="mobile-menu.js"]')) {
        const script = document.createElement('script');
        script.src = './assets/js/mobile-menu.js';
        document.body.appendChild(script);
        console.log('Mobile menu script loaded dynamically');
    }
}

function initMobileMenuEvents() {
    // This function will now act as a compatibility layer
    console.log('Checking for mobile menu elements');
    
    // Initialize mobile dropdown toggles
    initMobileDropdownToggles();
    
    // Modern mobile menu (with hamburger icon)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    
    if (mobileMenuButton && mobileMenuPanel) {
        console.log('Modern mobile menu found, initialization will be handled by mobile-menu.js');
        
        // Initialize mobile menu via the external script's function
        if (window.initializeMobileMenu) {
            window.initializeMobileMenu();
        } else {
            // If the function isn't available yet, wait a bit and try again
            setTimeout(() => {
                if (window.initializeMobileMenu) {
                    window.initializeMobileMenu();
                }
            }, 500);
        }
        return;
    }
    
    // Legacy mobile menu fallback (if it exists)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        console.log('Legacy mobile menu found');
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-2xl';
            } else {
                icon.className = 'fas fa-times text-2xl';
            }
        });
    }
}

// Toggle submenu function for mobile
function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    if (submenu) {
        submenu.classList.toggle('hidden');
        
        // Rotate chevron icon
        const button = submenu.previousElementSibling;
        const icon = button.querySelector('i');
        if (submenu.classList.contains('hidden')) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(180deg)';
        }
    }
}

// Initialize mobile dropdown toggles
function initMobileDropdownToggles() {
    const toggles = document.querySelectorAll('.mobile-dropdown-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const parentItem = this.closest('.mobile-nav-item');
            const submenu = parentItem.querySelector('.mobile-submenu');
            
            if (submenu) {
                submenu.classList.toggle('hidden');
                this.textContent = submenu.classList.contains('hidden') ? '+' : '-';
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.className = 'fixed bottom-20 right-6 bg-[#00bcd4] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-[#14dbf4] transition duration-300 opacity-0 z-50 invisible';
        backToTopBtn.innerHTML = '<i class="fas fa-angle-up"></i>';
        document.body.appendChild(backToTopBtn);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.classList.remove('show');
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize Animations
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.card, .service-card, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang gửi...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.', 'success');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform translate-x-full transition-transform duration-300`;
    
    // Set colors based on type
    switch(type) {
        case 'success':
            notification.className += ' bg-green-500 text-white';
            break;
        case 'error':
            notification.className += ' bg-red-500 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-white';
            break;
        default:
            notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="flex-1">${message}</span>
            <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('input[placeholder="Tìm kiếm..."]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // Implement search functionality
                    console.log('Searching for:', searchTerm);
                    showNotification(`Đang tìm kiếm: ${searchTerm}`, 'info');
                }
            }
        });
    }
}

// Utility Functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Initialize search with throttling
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initSearch();
    }, 1000);
});

// Handle window resize
window.addEventListener('resize', throttle(function() {
    // Handle responsive adjustments
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth >= 1024 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars text-2xl';
        }
    }
}, 250));

// Make functions available globally
window.toggleSubmenu = toggleSubmenu;
window.showNotification = showNotification;

// Initialize Floating Action Buttons (FAB)
document.addEventListener('DOMContentLoaded', function() {
    initFloatingActionButtons();
});

function initFloatingActionButtons() {
    // Get the help button and all other FAB buttons
    const helpButton = document.querySelector('.fab-button.help');
    const otherButtons = document.querySelectorAll('.fab-button:not(.help)');
    let buttonsVisible = false;
    
    if (helpButton) {
        // Add click event to the help button to toggle other buttons
        helpButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            buttonsVisible = !buttonsVisible;
            
            // Toggle rotation of the help button icon
            const icon = this.querySelector('i');
            icon.style.transition = 'transform 0.3s ease';
            
            if (buttonsVisible) {
                // Show other buttons with staggered animation
                otherButtons.forEach((button, index) => {
                    setTimeout(() => {
                        button.classList.add('show');
                    }, 100 * index);
                });
                icon.style.transform = 'rotate(45deg)';
            } else {
                // Hide other buttons with staggered animation
                Array.from(otherButtons).reverse().forEach((button, index) => {
                    setTimeout(() => {
                        button.classList.remove('show');
                    }, 100 * index);
                });
                icon.style.transform = 'rotate(0deg)';
            }
            
            // Add a subtle animation effect
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 300);
        });
        
        // Add click events to other FAB buttons
        otherButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                let message = '';
                
                // Handle different button actions based on class
                if (this.classList.contains('phone')) {
                    message = 'Gọi hotline: 1900 6789';
                    window.location.href = 'tel:19006789';
                } 
                else if (this.classList.contains('messenger')) {
                    message = 'Kết nối với Messenger';
                    window.open('https://m.me/your-page-id', '_blank');
                } 
                else if (this.classList.contains('zalo')) {
                    message = 'Kết nối với Zalo';
                    window.open('https://zalo.me/your-zalo-id', '_blank');
                }
                
                // Show notification
                if (message) {
                    showNotification(message, 'info');
                }
                
                // Add a subtle animation effect
                this.classList.add('animate-pulse');
                setTimeout(() => {
                    this.classList.remove('animate-pulse');
                }, 300);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (buttonsVisible && !e.target.closest('.fab-container')) {
                buttonsVisible = false;
                
                // Hide all buttons with staggered animation
                Array.from(otherButtons).reverse().forEach((button, index) => {
                    setTimeout(() => {
                        button.classList.remove('show');
                    }, 100 * index);
                });
                
                // Reset help button icon
                const icon = helpButton.querySelector('i');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }
}
