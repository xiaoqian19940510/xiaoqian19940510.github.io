/**
 * Main JavaScript for Academic Website
 * Features: Dark mode toggle, mobile navigation, smooth scrolling, etc.
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme Management
    class ThemeManager {
        constructor() {
            this.currentTheme = localStorage.getItem('theme') || 'light';
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            this.updateThemeIcon();
            
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        }

        toggleTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            this.updateThemeIcon();
            localStorage.setItem('theme', this.currentTheme);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }

        updateThemeIcon() {
            const icon = themeToggle?.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    // Navigation Management
    class NavigationManager {
        constructor() {
            this.isMenuOpen = false;
            this.init();
        }

        init() {
            this.setupMobileMenu();
            this.setupScrollBehavior();
            this.setupActiveLinks();
            this.setupResizeHandler();
            // Set correct initial display state
            this.updateMobileMenu();
        }

        setupMobileMenu() {
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => this.toggleMobileMenu());
                
                // Close menu when clicking outside (mobile only)
                document.addEventListener('click', (e) => {
                    if (!navbar.contains(e.target) && this.isMenuOpen && window.innerWidth < 768) {
                        this.closeMobileMenu();
                    }
                });

                // Close menu when clicking on a link (mobile only)
                const navLinks = navMenu.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth < 768) {
                            this.closeMobileMenu();
                        }
                    });
                });
            }
        }

        toggleMobileMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            this.updateMobileMenu();
        }

        closeMobileMenu() {
            this.isMenuOpen = false;
            this.updateMobileMenu();
        }

        updateMobileMenu() {
            if (navMenu) {
                // Only manipulate display on mobile devices
                if (window.innerWidth < 768) {
                    navMenu.style.display = this.isMenuOpen ? 'block' : 'none';
                } else {
                    // On desktop, remove inline style to let CSS media query handle it
                    navMenu.style.display = '';
                }
                navToggle?.setAttribute('aria-expanded', this.isMenuOpen);
                
                // Add/remove active class for styling
                navbar.classList.toggle('nav-open', this.isMenuOpen);
            }
        }

        setupScrollBehavior() {
            let lastScrollY = window.scrollY;
            let ticking = false;

            const updateNavbar = () => {
                const currentScrollY = window.scrollY;
                
                // Add/remove scrolled class for styling
                if (currentScrollY > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll (mobile)
                if (window.innerWidth <= 768) {
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        navbar.style.transform = 'translateY(0)';
                    }
                }

                lastScrollY = currentScrollY;
                ticking = false;
            };

            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(updateNavbar);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', requestTick, { passive: true });
        }

        setupActiveLinks() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

            if (sections.length === 0 || navLinks.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentSection = entry.target.id;
                        navLinks.forEach(link => {
                            const href = link.getAttribute('href');
                            if (href === `#${currentSection}`) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-100px 0px'
            });

            sections.forEach(section => observer.observe(section));
        }

        setupResizeHandler() {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Close mobile menu on resize to desktop
                    if (window.innerWidth >= 768 && this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                    // Ensure correct display state
                    this.updateMobileMenu();
                }, 100);
            });
        }
    }

    // Smooth Scrolling
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            // Handle anchor links
            document.addEventListener('click', (e) => {
                const target = e.target.closest('a[href^="#"]');
                if (target) {
                    e.preventDefault();
                    const targetId = target.getAttribute('href').substring(1);
                    this.scrollToElement(targetId);
                }
            });
        }

        scrollToElement(targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80; // Account for fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Animation Observer
    class AnimationObserver {
        constructor() {
            this.init();
        }

        init() {
            // Add animation classes to elements as they come into view
            const animatedElements = document.querySelectorAll('.stat-item, .project-card, .award-item, .news-item');
            
            if (animatedElements.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedElements.forEach(element => observer.observe(element));
        }
    }

    // Utility Functions
    class Utils {
        static debounce(func, wait) {
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

        static throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        static copyToClipboard(text) {
            if (navigator.clipboard) {
                return navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    return Promise.resolve();
                } catch (err) {
                    return Promise.reject(err);
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        }
    }

    // Publications Manager with filtering functionality
    class PublicationsManager {
        constructor() {
            this.publicationsContainer = document.getElementById('publicationsList');
            this.yearFilter = document.getElementById('yearFilter');
            this.ccfFilter = document.getElementById('ccfFilter');
            this.typeFilter = document.getElementById('typeFilter');
            this.visibleCount = document.getElementById('visibleCount');
            this.expandBtn = document.getElementById('expandBtn');
            this.expandSection = document.getElementById('publicationsExpand');
            this.allPublications = [];
            this.filteredPublications = [];
            this.isExpanded = false;
            this.defaultShowCount = 10;
            
            this.init();
        }

        init() {
            if (!this.publicationsContainer) return;
            
            this.getAllPublications();
            this.setupFilters();
            this.updateVisibleCount();
            this.updateExpandButton();
        }

        getAllPublications() {
            this.allPublications = Array.from(this.publicationsContainer.querySelectorAll('.pub-item'));
            this.filteredPublications = [...this.allPublications];
        }

        setupFilters() {
            if (this.yearFilter) {
                this.yearFilter.addEventListener('change', () => this.applyFilters());
            }
            if (this.ccfFilter) {
                this.ccfFilter.addEventListener('change', () => this.applyFilters());
            }
            if (this.typeFilter) {
                this.typeFilter.addEventListener('change', () => this.applyFilters());
            }
        }

        applyFilters() {
            const yearValue = this.yearFilter?.value || 'all';
            const ccfValue = this.ccfFilter?.value || 'all';
            const typeValue = this.typeFilter?.value || 'all';

            this.filteredPublications = this.allPublications.filter(pub => {
                const year = pub.dataset.year;
                const ccf = pub.dataset.ccf;
                const type = pub.dataset.type;

                const yearMatch = yearValue === 'all' || year === yearValue;
                const ccfMatch = ccfValue === 'all' || ccf === ccfValue;
                const typeMatch = typeValue === 'all' || type === typeValue;

                return yearMatch && ccfMatch && typeMatch;
            });

            // Reset expansion state when filters change
            this.isExpanded = false;
            this.updateDisplay();
            this.updateVisibleCount();
            this.updateExpandButton();
        }

        updateDisplay() {
            this.allPublications.forEach((pub, index) => {
                const isFiltered = this.filteredPublications.includes(pub);
                const shouldShow = isFiltered && (this.isExpanded || this.filteredPublications.indexOf(pub) < this.defaultShowCount);
                
                if (shouldShow) {
                    pub.classList.remove('hidden', 'pub-item-hidden');
                    pub.style.display = 'grid';
                } else {
                    pub.classList.add(isFiltered ? 'pub-item-hidden' : 'hidden');
                    pub.style.display = 'none';
                }
            });
        }

        updateVisibleCount() {
            if (this.visibleCount) {
                const visibleItems = this.isExpanded ? 
                    this.filteredPublications.length : 
                    Math.min(this.filteredPublications.length, this.defaultShowCount);
                this.visibleCount.textContent = visibleItems;
            }
        }

        updateExpandButton() {
            if (this.expandSection && this.expandBtn) {
                // Show/hide expand button based on whether there are more than 10 filtered items
                if (this.filteredPublications.length <= this.defaultShowCount) {
                    this.expandSection.style.display = 'none';
                } else {
                    this.expandSection.style.display = 'block';
                    
                    // Update button text and icon
                    const btnText = this.expandBtn.querySelector('span');
                    const btnIcon = this.expandBtn.querySelector('i');
                    
                    if (this.isExpanded) {
                        btnText.textContent = 'Show Less Publications';
                        this.expandBtn.classList.add('expanded');
                    } else {
                        btnText.textContent = 'Show More Publications';
                        this.expandBtn.classList.remove('expanded');
                    }
                }
            }
        }

        toggleExpanded() {
            this.isExpanded = !this.isExpanded;
            this.updateDisplay();
            this.updateVisibleCount();
            this.updateExpandButton();
        }

        showToast(message) {
            // Simple toast notification
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: var(--primary-color);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                z-index: 10000;
                animation: slideInUp 0.3s ease, slideOutDown 0.3s ease 2.7s;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 3000);
        }
    }

    // Global functions
    window.resetFilters = function() {
        const yearFilter = document.getElementById('yearFilter');
        const ccfFilter = document.getElementById('ccfFilter');
        const typeFilter = document.getElementById('typeFilter');
        
        if (yearFilter) yearFilter.value = 'all';
        if (ccfFilter) ccfFilter.value = 'all';
        if (typeFilter) typeFilter.value = 'all';
        
        // Trigger change event to apply filters
        if (yearFilter) yearFilter.dispatchEvent(new Event('change'));
    };

    window.togglePublications = function() {
        if (window.publicationsManager) {
            window.publicationsManager.toggleExpanded();
        }
    };

    // Performance optimization
    class PerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            this.lazyLoadImages();
            this.preloadCriticalResources();
        }

        lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            } else {
                // Fallback for browsers without IntersectionObserver
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
            }
        }

        preloadCriticalResources() {
            // Preload critical CSS and fonts
            const criticalResources = [
                { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as;
                document.head.appendChild(link);
            });
        }
    }

    // Initialize everything when DOM is ready
    const init = () => {
        // Initialize all managers
        new ThemeManager();
        new NavigationManager();
        new SmoothScroll();
        new AnimationObserver();
        window.publicationsManager = new PublicationsManager();
        new PerformanceOptimizer();

        // Add some CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes slideOutDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .nav-link.active {
                color: var(--primary-color) !important;
            }
            
            .navbar.scrolled {
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
            }
            
            [data-theme="dark"] .navbar.scrolled {
                background-color: rgba(15, 23, 42, 0.95);
            }
        `;
        document.head.appendChild(style);

        console.log('🎉 Academic website initialized successfully!');
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle window resize
    window.addEventListener('resize', Utils.debounce(() => {
        // Reset mobile menu on desktop
        if (window.innerWidth > 768 && navMenu) {
            navMenu.style.display = '';
            navbar.classList.remove('nav-open');
        }
    }, 250));

    // Expose utilities globally if needed
    window.AcademicSite = {
        Utils,
        version: '1.0.0'
    };

})(); 