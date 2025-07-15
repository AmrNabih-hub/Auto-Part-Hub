document.addEventListener('DOMContentLoaded', () => {
    console.log('Pro Auto Parts - Application Initialized');

    let shoppingCart = [];
    const toastEl = document.getElementById('success-toast');
    const successToast = new bootstrap.Toast(toastEl);

    // Add error handling for image loading
    function handleImageError(img) {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
        img.alt = 'Image not available';
    }

    // Add loading states
    function showLoading(element) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    }

    function hideLoading(element) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }

    // Enhanced search with debouncing
    let searchTimeout;
    function debouncedSearch(value) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderContent(value);
        }, 300);
    }

    // Get featured products (6 products from different categories)
    function getFeaturedProducts() {
        const featuredProducts = [];
        const categories = Object.keys(partsData);
        
        // Select one product from each of the first 6 categories
        for (let i = 0; i < Math.min(6, categories.length); i++) {
            const category = categories[i];
            if (partsData[category] && partsData[category].length > 0) {
                featuredProducts.push({
                    ...partsData[category][0],
                    category: category
                });
            }
        }
        
        return featuredProducts;
    }

    function renderContent(filter = '') {
        const partsContainer = document.getElementById('parts-container');
        const categoryLinks = document.getElementById('category-links');
        
        if (!partsContainer || !categoryLinks) {
            console.error('Required elements not found');
            return;
        }

        // Show loading state
        partsContainer.style.opacity = '0.6';
        
        setTimeout(() => {
            partsContainer.innerHTML = '';
            categoryLinks.innerHTML = '';
            const searchFilter = filter.toLowerCase();

            // If no filter, show home page with featured products
            if (!filter) {
                renderHomePage();
                return;
            }

            let hasResults = false;

            for (const category in partsData) {
                const filteredParts = partsData[category].filter(p => 
                    p.name.toLowerCase().includes(searchFilter) ||
                    p.dealer.toLowerCase().includes(searchFilter) ||
                    p.description.toLowerCase().includes(searchFilter)
                );
                
                if (filteredParts.length === 0) continue;

                hasResults = true;
                categoryLinks.innerHTML += `<li><a class="dropdown-item" href="#category-${category.replace(/\s+/g, '-')}">${category}</a></li>`;
                
                const categorySection = document.createElement('section');
                categorySection.id = `category-${category.replace(/\s+/g, '-')}`;
                categorySection.className = 'mb-5';
                categorySection.innerHTML = `<h2 class="category-title">${category}</h2>`;
                
                const row = document.createElement('div');
                row.className = 'row g-4';
                filteredParts.forEach((part, index) => {
                    row.innerHTML += `
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100" style="animation-delay: ${index * 0.1}s;">
                                <img src="${part.images[0]}" class="card-img-top" alt="${part.name}" onerror="handleImageError(this)">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">${part.name}</h5>
                                    <p class="card-text text-muted">${part.dealer}</p>
                                    <p class="card-text fs-4 fw-bold">$${part.price.toFixed(2)}</p>
                                    <button class="btn cta-button mt-auto" onclick='openProductModal(${JSON.stringify(part).replace(/'/g, "\\'")})'>
                                        <i class="bi bi-eye me-2"></i>View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                categorySection.appendChild(row);
                partsContainer.appendChild(categorySection);
            }

            if (!hasResults && filter) {
                partsContainer.innerHTML = `
                    <div class="text-center py-5">
                        <i class="bi bi-search display-1 text-muted mb-3"></i>
                        <h3 class="text-muted">No products found</h3>
                        <p class="text-muted">Try adjusting your search terms</p>
                    </div>
                `;
            }

            // Hide loading state
            partsContainer.style.opacity = '1';
        }, 100);
    }

    function renderHomePage() {
        const partsContainer = document.getElementById('parts-container');
        const featuredProducts = getFeaturedProducts();
        
        partsContainer.innerHTML = `
            <!-- Hero Section -->
            <section class="hero-section mb-5">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h1 class="display-4 fw-bold mb-4">Premium Auto Parts & Accessories</h1>
                        <p class="lead mb-4">Discover high-quality automotive parts from trusted manufacturers. From engine components to exterior accessories, we have everything you need to keep your vehicle running at peak performance.</p>
                        <div class="d-flex gap-3">
                            <button class="btn cta-button btn-lg" onclick="renderAllProducts()">
                                <i class="bi bi-grid me-2"></i>Browse All Products
                            </button>
                            <button class="btn btn-outline-primary btn-lg" onclick="document.getElementById('search-bar').focus()">
                                <i class="bi bi-search me-2"></i>Search Parts
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <img src="https://picsum.photos/600/400?random=hero" alt="Auto Parts" class="img-fluid rounded shadow">
                    </div>
                </div>
            </section>

            <!-- Featured Products Section -->
            <section class="featured-products mb-5">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="section-title">Featured Products</h2>
                    <button class="btn btn-outline-primary" onclick="renderAllProducts()">
                        View All <i class="bi bi-arrow-right ms-1"></i>
                    </button>
                </div>
                <div class="row g-4">
                    ${featuredProducts.map((product, index) => `
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100 featured-card" style="animation-delay: ${index * 0.1}s;">
                                <div class="position-relative">
                                    <img src="${product.images[0]}" class="card-img-top" alt="${product.name}" onerror="handleImageError(this)">
                                    <span class="badge bg-primary position-absolute top-0 end-0 m-2">${product.category}</span>
                                </div>
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text text-muted">${product.dealer}</p>
                                    <p class="card-text fs-4 fw-bold text-primary">$${product.price.toFixed(2)}</p>
                                    <button class="btn cta-button mt-auto" onclick='openProductModal(${JSON.stringify(product).replace(/'/g, "\\'")})'>
                                        <i class="bi bi-eye me-2"></i>View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Categories Overview -->
            <section class="categories-overview">
                <h2 class="section-title mb-4">Shop by Category</h2>
                <div class="row g-4">
                    ${Object.keys(partsData).slice(0, 8).map((category, index) => `
                        <div class="col-md-6 col-lg-3">
                            <div class="card category-card h-100" onclick="filterByCategory('${category}')" style="cursor: pointer; animation-delay: ${index * 0.1}s;">
                                <div class="card-body text-center">
                                    <i class="bi bi-gear-wide-connected display-4 text-primary mb-3"></i>
                                    <h5 class="card-title">${category}</h5>
                                    <p class="card-text text-muted">${partsData[category].length} products</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
        
        // Hide loading state
        partsContainer.style.opacity = '1';
    }

    function renderAllProducts() {
        const searchBar = document.getElementById('search-bar');
        if (searchBar) {
            searchBar.value = '';
        }
        renderContent('');
    }

    function filterByCategory(category) {
        const searchBar = document.getElementById('search-bar');
        if (searchBar) {
            searchBar.value = category;
            renderContent(category);
        }
    }

    // Highlight current page in navigation
    function highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Highlight Home link by default
        const homeLink = document.querySelector('.nav-link[href="#"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }

    // Initialize the page
    renderHomePage();
    highlightCurrentPage();

    // Set up search functionality
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.trim() === '') {
                renderHomePage();
            } else {
                debouncedSearch(value);
            }
        });
        
        // Add search icon
        searchBar.style.paddingLeft = '2.5rem';
        const searchIcon = document.createElement('i');
        searchIcon.className = 'bi bi-search position-absolute';
        searchIcon.style.left = '0.75rem';
        searchIcon.style.top = '50%';
        searchIcon.style.transform = 'translateY(-50%)';
        searchIcon.style.color = '#6c757d';
        searchBar.parentElement.style.position = 'relative';
        searchBar.parentElement.appendChild(searchIcon);
    }

    window.openProductModal = (part) => {
        document.getElementById('part-modal-label').textContent = part.name;
        const modalBody = document.getElementById('modal-body-content');
        let variantsHTML = '';
        
        if(part.variants && part.variants.length > 0) {
            variantsHTML = part.variants.map(v => `
                <div class="mb-3">
                    <label for="variant-${v.name}" class="form-label fw-semibold">${v.name}:</label>
                    <select class="form-select" id="variant-${v.name}">
                        ${v.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
            `).join('');
        }

        modalBody.innerHTML = `
            <div class="row">
                <div class="col-lg-7">
                    <div id="carouselPartImages" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${part.images.map((img, i) => `<div class="carousel-item ${i === 0 ? 'active' : ''}"><img src="${img}" class="d-block w-100 rounded" alt="${part.name}" onerror="handleImageError(this)"></div>`).join('')}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselPartImages" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselPartImages" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h4 class="mb-1">${part.name}</h4>
                            <p class="text-muted mb-2"><i class="bi bi-shop me-1"></i>${part.dealer}</p>
                        </div>
                        <span class="badge bg-primary fs-6">$${part.price.toFixed(2)}</span>
                    </div>
                    
                    <div class="mb-4">
                        <h6 class="fw-semibold mb-2">Description</h6>
                        <p class="text-muted">${part.description}</p>
                    </div>
                    
                    ${variantsHTML}
                    
                    <div class="mb-4">
                        <h6 class="fw-semibold mb-2"><i class="bi bi-car-front me-1"></i>Vehicle Compatibility</h6>
                        <p class="text-muted">${part.compatibility}</p>
                    </div>
                    
                    <div class="d-flex gap-3 align-items-center">
                        <div class="input-group" style="max-width: 120px;">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(-1)">-</button>
                            <input type="number" class="form-control text-center" value="1" min="1" id="quantity-input">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(1)">+</button>
                        </div>
                        <button class="btn cta-button flex-grow-1" onclick='addToCart(${JSON.stringify(part).replace(/'/g, "\\'")})'>
                            <i class="bi bi-cart-plus me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const partModal = new bootstrap.Modal(document.getElementById('part-modal'));
        partModal.show();
    };

    // Quantity controls
    window.updateQuantity = (change) => {
        const input = document.getElementById('quantity-input');
        if (input) {
            const newValue = Math.max(1, parseInt(input.value) + change);
            input.value = newValue;
        }
    };

    window.addToCart = (part) => {
        const quantityInput = document.getElementById('quantity-input');
        if (!quantityInput) {
            console.error('Quantity input not found');
            return;
        }
        
        const quantity = parseInt(quantityInput.value) || 1;
        const existingItem = shoppingCart.find(item => item.id === part.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            shoppingCart.push({ ...part, quantity });
        }
        
        updateCartUI();
        
        // Enhanced success feedback
        const toastBody = document.querySelector('#success-toast .toast-body');
        if (toastBody) {
            toastBody.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    <span>${quantity}x ${part.name} added to cart!</span>
                </div>
            `;
        }
        
        successToast.show();
        
        // Update cart icon with animation
        const cartIcon = document.querySelector('.cart-icon-wrapper');
        if (cartIcon) {
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        }
    };

    function updateCartUI() {
        const cartQuantity = document.getElementById('cart-quantity');
        const miniCartBody = document.getElementById('mini-cart-body');
        
        if (!cartQuantity || !miniCartBody) {
            console.error('Cart elements not found');
            return;
        }
        
        const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartQuantity.textContent = totalItems;
        
        if(totalItems === 0) {
            miniCartBody.innerHTML = `
                <div class="text-center py-4">
                    <i class="bi bi-cart-x display-4 text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                </div>
            `;
        } else {
            miniCartBody.innerHTML = `
                <div class="cart-items">
                    ${shoppingCart.map(item => `
                        <div class="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${item.name}</h6>
                                <small class="text-muted">Qty: ${item.quantity}</small>
                            </div>
                            <div class="text-end">
                                <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                                <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${item.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="border-top pt-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">Total:</h6>
                        <span class="fw-bold fs-5">$${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            `;
        }
    }

    // Remove item from cart
    window.removeFromCart = (itemId) => {
        shoppingCart = shoppingCart.filter(item => item.id !== itemId);
        updateCartUI();
    };

    // Enhanced theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme || (prefersDark ? 'dark-mode' : 'light-mode');
        
        document.body.className = initialTheme;
        themeSwitcher.checked = document.body.classList.contains('dark-mode');
        
        themeSwitcher.addEventListener('change', () => {
            const isDark = themeSwitcher.checked;
            document.body.classList.toggle('dark-mode', isDark);
            document.body.classList.toggle('light-mode', !isDark);
            localStorage.setItem('theme', document.body.className);
            
            // Add transition effect
            document.body.style.transition = 'all 0.3s ease-in-out';
        });
    }

    // Smooth scrolling for category links
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('dropdown-item')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Initialize the application
    try {
        updateCartUI();
        
        // Add loading animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '1';
        }, 100);
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});