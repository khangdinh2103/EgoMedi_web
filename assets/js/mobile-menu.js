// Mobile Menu Toggle Functionality
function initializeMobileMenu() {
    console.log('Initializing mobile menu with full functionality');
    
    // Get references to elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    const mobileCloseButton = document.getElementById('mobile-menu-close');
    
    // Toggle mobile menu when hamburger icon is clicked
    if (mobileMenuButton && mobileMenuPanel) {
        console.log('Mobile menu button found:', mobileMenuButton);
        mobileMenuButton.addEventListener('click', function(e) {
            console.log('Mobile menu button clicked');
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            
            // Toggle the mobile menu visibility
            if (mobileMenuPanel.classList.contains('hidden')) {
                mobileMenuPanel.classList.remove('hidden');
                mobileMenuPanel.classList.add('block');
                // Add animation classes
                setTimeout(() => {
                    mobileMenuPanel.classList.add('opacity-100');
                    mobileMenuPanel.classList.remove('opacity-0');
                }, 10);
            } else {
                // Hide with animation
                mobileMenuPanel.classList.remove('opacity-100');
                mobileMenuPanel.classList.add('opacity-0');
                setTimeout(() => {
                    mobileMenuPanel.classList.add('hidden');
                    mobileMenuPanel.classList.remove('block');
                }, 300);
            }
        });
    } else {
        console.error('Mobile menu button or panel not found:', { 
            button: mobileMenuButton, 
            panel: mobileMenuPanel 
        });
    }
    
    // Close mobile menu when clicking the close button
    if (mobileCloseButton) {
        console.log('Mobile close button found:', mobileCloseButton);
        mobileCloseButton.addEventListener('click', function(e) {
            console.log('Mobile close button clicked');
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            
            mobileMenuPanel.classList.remove('opacity-100');
            mobileMenuPanel.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuPanel.classList.add('hidden');
                mobileMenuPanel.classList.remove('block');
            }, 300);
        });
    } else {
        console.error('Mobile close button not found');
    }
    
    // Set up the mobile menu panel to prevent clicks inside it from closing the menu
    if (mobileMenuPanel) {
        mobileMenuPanel.addEventListener('click', function(e) {
            // This prevents the document click handler from closing the menu
            // when clicking inside the menu panel
            e.stopPropagation();
        });
    }
    
    // Mobile accordion menus (dropdowns)
    setupMobileAccordions();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenuPanel && 
            !mobileMenuPanel.classList.contains('hidden') && 
            !mobileMenuPanel.contains(event.target) && 
            !mobileMenuButton.contains(event.target)) {
            
            console.log('Clicked outside, closing mobile menu');
            // Hide with animation
            mobileMenuPanel.classList.remove('opacity-100');
            mobileMenuPanel.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuPanel.classList.add('hidden');
                mobileMenuPanel.classList.remove('block');
            }, 300);
        }
    });
}

// Setup accordion functionality for mobile dropdowns
function setupMobileAccordions() {
    // Use setTimeout to ensure the DOM is fully loaded
    setTimeout(() => {
        // Select all dropdown headers (items with + icons)
        const dropdownHeaders = document.querySelectorAll('#mobile-menu-panel .border-b > div.flex.items-center.justify-between');
        console.log('Found dropdown headers:', dropdownHeaders.length);
        
        if (dropdownHeaders.length > 0) {
            dropdownHeaders.forEach(header => {
                header.addEventListener('click', function(e) {
                    console.log('Dropdown header clicked:', this);
                    
                    // Prevent link navigation and event bubbling
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Find the dropdown content (next sibling div)
                    const content = this.nextElementSibling;
                    console.log('Content panel found:', content);
                    
                    if (content && content.tagName === 'DIV') {
                        // Toggle the hidden class
                        content.classList.toggle('hidden');
                        
                        // Toggle the + to - for dropdown indicators
                        const plusIcon = this.querySelector('span.text-lg');
                        if (plusIcon) {
                            if (content.classList.contains('hidden')) {
                                plusIcon.textContent = '+';
                            } else {
                                plusIcon.textContent = '−'; // Using the minus sign
                            }
                        }
                    }
                });
            });
            console.log('Successfully added click handlers to dropdown headers');
        } else {
            console.error('No dropdown headers found with the current selector');
            
            // Try with a more general selector as fallback
            const allItems = document.querySelectorAll('#mobile-menu-panel .border-b');
            console.log('Trying alternative selector, found items:', allItems.length);
            
            allItems.forEach(item => {
                const header = item.querySelector('div.flex');
                const content = item.querySelector('div.bg-gray-50');
                const plusIcon = item.querySelector('span.text-lg');
                
                if (header && content && plusIcon) {
                    console.log('Found menu item with dropdown content');
                    
                    header.addEventListener('click', function(e) {
                        console.log('Header clicked via fallback selector');
                        
                        // Prevent link navigation and event bubbling
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Toggle the hidden class
                        content.classList.toggle('hidden');
                        
                        // Toggle the + to - for dropdown indicators
                        if (content.classList.contains('hidden')) {
                            plusIcon.textContent = '+';
                        } else {
                            plusIcon.textContent = '−'; // Using the minus sign
                        }
                    });
                }
            });
        }
    }, 500);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenuPanel = document.getElementById('mobile-menu-panel');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        
        if (mobileMenuPanel && mobileMenuButton &&
            !mobileMenuPanel.contains(event.target) && 
            !mobileMenuButton.contains(event.target) &&
            !mobileMenuPanel.classList.contains('hidden')) {
            // Hide with animation
            mobileMenuPanel.classList.remove('opacity-100');
            mobileMenuPanel.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuPanel.classList.add('hidden');
                mobileMenuPanel.classList.remove('block');
            }, 300);
        }
    });
}

// Call initialization when document is loaded or when called externally
document.addEventListener('DOMContentLoaded', function() {
    // Check if header is already loaded, otherwise wait for it
    setTimeout(function() {
        console.log('Initializing mobile menu from DOMContentLoaded event...');
        initializeMobileMenu();
    }, 300); // Increased timeout to ensure header is fully loaded
});

// Make function available globally so it can be called from main.js
window.initializeMobileMenu = initializeMobileMenu;
