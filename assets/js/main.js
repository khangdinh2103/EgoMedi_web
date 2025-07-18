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
    } catch (error) {
        console.error('Error loading header:', error);
        // Fallback header
        document.getElementById('header').innerHTML = `
            <header class="bg-white shadow-lg">
                <div class="container mx-auto px-4 py-4">
                    <div class="flex justify-between items-center">
                        <div class="text-2xl font-bold text-blue-600">EgoMedi</div>
                        <nav class="hidden md:flex space-x-6">
                            <a href="index.html" class="text-gray-700 hover:text-blue-600">Trang chủ</a>
                            <a href="#" class="text-gray-700 hover:text-blue-600">Dịch vụ</a>
                            <a href="#" class="text-gray-700 hover:text-blue-600">Về chúng tôi</a>
                            <a href="#" class="text-gray-700 hover:text-blue-600">Liên hệ</a>
                        </nav>
                    </div>
                </div>
            </header>
        `;
    }
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
            <footer class="bg-gray-800 text-white py-8">
                <div class="container mx-auto px-4 text-center">
                    <p>&copy; 2025 EgoMedi. Tất cả quyền được bảo lưu.</p>
                </div>
            </footer>
        `;
    }
}

// Initialize Mobile Menu
function initMobileMenu() {
    // This will be called after header is loaded
}

function initMobileMenuEvents() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
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

// Back to Top Button
function initBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.className = 'fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 opacity-0 invisible';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
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
