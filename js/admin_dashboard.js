// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = {
        'nike-downshifter-12': {
            name: 'Nike Downshifter 12',
            price: '819,000',
            stock: 975,
            sold: 768,
            category: 'Running',
            description: 'The Nike Downshifter 12 provides lightweight cushioning and responsive support for your daily runs. Featuring a breathable mesh upper and durable rubber outsole, these shoes offer comfort and performance for every step of your journey.',
            image: '../IMAGES/sample1.jpg'
        },
        'compass-retrograde': {
            name: 'Compass Retrograde High',
            price: '668,000',
            stock: 494,
            sold: 341,
            category: 'Skateboard',
            description: 'The Compass Retrograde High offers classic skateboard style with modern comfort. Perfect for street skating and casual wear.',
            image: '../IMAGES/sample2.jpg'
        },
        'adidas-superstar': {
            name: 'Adidas Superstar XRLG Green',
            price: '2,000,000',
            stock: 624,
            sold: 489,
            category: 'Basketball',
            description: 'The iconic Adidas Superstar with a fresh green colorway. Classic shell toe design meets modern comfort.',
            image: '../IMAGES/sample3.webp'
        },
        'vans-old-skool': {
            name: 'Vans Old Skool Shoe',
            price: '899,000',
            stock: 342,
            sold: 256,
            category: 'Skateboard',
            description: 'The timeless Vans Old Skool with the signature side stripe. A skateboarding classic.',
            image: '../IMAGES/sample4.jpg'
        },
        'nike-air-max-90': {
            name: 'Nike Air Max 90',
            price: '1,599,000',
            stock: 523,
            sold: 412,
            category: 'Running',
            description: 'The Nike Air Max 90 combines heritage style with modern comfort. Visible Air cushioning for all-day comfort.',
            image: '../IMAGES/sample5.jpg'
        },
        'nike-air-max-pulse': {
            name: 'Nike Air Max Pulse',
            price: '1,299,000',
            stock: 456,
            sold: 389,
            category: 'Running',
            description: 'The Nike Air Max Pulse delivers responsive cushioning and a sleek design for your daily runs.',
            image: '../IMAGES/sample6.jpg'
        },
        'nike-air-force': {
            name: 'Nike Air Force 1 \'07',
            price: '1,199,000',
            stock: 678,
            sold: 567,
            category: 'Basketball',
            description: 'The legend lives on in the Nike Air Force 1 \'07. Classic basketball style with modern comfort.',
            image: '../IMAGES/sample7.jpg'
        },
        'nike-air-max-97': {
            name: 'Nike Air Max 97',
            price: '1,799,000',
            stock: 389,
            sold: 298,
            category: 'Running',
            description: 'The Nike Air Max 97 features full-length visible Air cushioning and a sleek, futuristic design.',
            image: '../IMAGES/sample8.jpg'
        },
        'nike-dunk-low': {
            name: 'Nike Dunk Low',
            price: '1,499,000',
            stock: 567,
            sold: 445,
            category: 'Basketball',
            description: 'The Nike Dunk Low brings back the classic basketball style with modern comfort and durability.',
            image: '../IMAGES/sample9.jpg'
        },
        'nike-court-vision': {
            name: 'Nike Court Vision Low',
            price: '999,000',
            stock: 712,
            sold: 589,
            category: 'Basketball',
            description: 'The Nike Court Vision Low offers classic style with modern comfort for everyday wear.',
            image: '../IMAGES/sample10.jpg'
        },
        'adidas-ultraboost': {
            name: 'Adidas Ultraboost 22',
            price: '2,499,000',
            stock: 423,
            sold: 356,
            category: 'Running',
            description: 'The Adidas Ultraboost 22 features responsive cushioning and energy return for maximum comfort.',
            image: '../IMAGES/sample11.jpg'
        },
        'adidas-stan-smith': {
            name: 'Adidas Stan Smith',
            price: '1,299,000',
            stock: 589,
            sold: 478,
            category: 'Fun Sneakers',
            description: 'The iconic Adidas Stan Smith with timeless design and premium materials.',
            image: '../IMAGES/sample12.jpg'
        },
        'nike-blazer-mid': {
            name: 'Nike Blazer Mid \'77',
            price: '1,399,000',
            stock: 634,
            sold: 512,
            category: 'Skateboard',
            description: 'The Nike Blazer Mid \'77 combines retro style with modern comfort and durability.',
            image: '../IMAGES/sample1.jpg'
        },
        'nike-revolution-6': {
            name: 'Nike Revolution 6',
            price: '899,000',
            stock: 756,
            sold: 623,
            category: 'Running',
            description: 'The Nike Revolution 6 provides lightweight cushioning for your daily runs and workouts.',
            image: '../IMAGES/sample2.jpg'
        },
        'adidas-nmd-r1': {
            name: 'Adidas NMD R1',
            price: '2,199,000',
            stock: 445,
            sold: 367,
            category: 'Running',
            description: 'The Adidas NMD R1 features Boost cushioning and a modern, streamlined design.',
            image: '../IMAGES/sample3.webp'
        },
        'vans-authentic': {
            name: 'Vans Authentic',
            price: '799,000',
            stock: 523,
            sold: 412,
            category: 'Skateboard',
            description: 'The classic Vans Authentic with timeless design and durable construction.',
            image: '../IMAGES/sample4.jpg'
        },
        'nike-zoom-fly': {
            name: 'Nike Zoom Fly 5',
            price: '1,899,000',
            stock: 378,
            sold: 289,
            category: 'Running',
            description: 'The Nike Zoom Fly 5 delivers responsive cushioning and speed for your runs.',
            image: '../IMAGES/sample5.jpg'
        },
        'nike-pegasus-40': {
            name: 'Nike Pegasus 40',
            price: '1,699,000',
            stock: 512,
            sold: 401,
            category: 'Running',
            description: 'The Nike Pegasus 40 offers responsive cushioning and all-day comfort.',
            image: '../IMAGES/sample6.jpg'
        },
        'adidas-gazelle': {
            name: 'Adidas Gazelle',
            price: '1,499,000',
            stock: 467,
            sold: 378,
            category: 'Fun Sneakers',
            description: 'The Adidas Gazelle combines retro style with modern comfort and versatility.',
            image: '../IMAGES/sample7.jpg'
        },
        'nike-jordan-1': {
            name: 'Nike Air Jordan 1 Low',
            price: '2,299,000',
            stock: 334,
            sold: 267,
            category: 'Basketball',
            description: 'The iconic Air Jordan 1 Low brings classic basketball heritage to everyday style.',
            image: '../IMAGES/sample8.jpg'
        }
    };

    // Product card selection (using event delegation for pagination)
    function setupProductCardListeners() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            // Remove existing listeners by cloning
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
        });
        
        // Re-attach listeners
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                document.querySelectorAll('.product-card').forEach(c => c.classList.remove('active-card'));
                
                // Add active class to clicked card
                this.classList.add('active-card');
                
                // Get product data
                const productId = this.getAttribute('data-product');
                const product = products[productId];
                
                if (product) {
                    updateEditPanel(product);
                }
            });
        });
    }
    
    // Initial setup
    setupProductCardListeners();

    // Tab switching
    const editTabs = document.querySelectorAll('.edit-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    editTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            editTabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tabs .tab-btn');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Here you would filter products based on category
        });
    });

    // Update edit panel with product data
    function updateEditPanel(product) {
        // Update image
        const productImage = document.getElementById('editProductImage');
        if (productImage) {
            productImage.src = product.image;
            productImage.alt = product.name;
        }
        
        // Update form fields in Descriptions tab
        const productNameInput = document.getElementById('productName');
        if (productNameInput) {
            productNameInput.value = product.name;
        }
        
        const productDescription = document.getElementById('productDescription');
        if (productDescription) {
            productDescription.value = product.description;
        }
        
        // Update category (you might need to add this field)
        const categoryInputs = document.querySelectorAll('#descriptions input[value="Running"], #descriptions input[value="Basketball"], #descriptions input[value="Skateboard"]');
        categoryInputs.forEach(input => {
            if (input.type === 'text' && input.placeholder !== 'Product Category') {
                // Find the category input field
                const categoryField = document.querySelector('#descriptions .form-group:last-child input');
                if (categoryField) {
                    categoryField.value = product.category;
                }
            }
        });
        
        // Update Inventory tab
        const inventoryInputs = document.querySelectorAll('#inventory input[type="number"]');
        if (inventoryInputs.length >= 2) {
            inventoryInputs[0].value = product.stock; // Current Stock
            inventoryInputs[1].value = product.sold; // Total Sold
        }
        
        // Update Pricing tab
        const pricingInputs = document.querySelectorAll('#pricing input');
        if (pricingInputs.length >= 1) {
            pricingInputs[0].value = product.price; // Price
        }
    }

    // Initialize with first product (after pagination setup)
    setTimeout(() => {
        const firstCard = document.querySelector('.product-card[data-product="nike-downshifter-12"]');
        if (firstCard && firstCard.closest('.product-item').style.display !== 'none') {
            firstCard.classList.add('active-card');
            const firstProductId = firstCard.getAttribute('data-product');
            if (firstProductId && products[firstProductId]) {
                updateEditPanel(products[firstProductId]);
            }
        }
    }, 100);

    // User profile dropdown
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const profileTrigger = userProfileDropdown?.querySelector('.user-profile-trigger');
    
    if (userProfileDropdown && profileTrigger) {
        profileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            userProfileDropdown.classList.toggle('active');
            console.log('Dropdown toggled, active:', userProfileDropdown.classList.contains('active'));
        });
    } else {
        console.error('User profile dropdown elements not found');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (userProfileDropdown && !userProfileDropdown.contains(e.target)) {
            userProfileDropdown.classList.remove('active');
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            productCards.forEach(card => {
                const productName = card.querySelector('.card-title').textContent.toLowerCase();
                const productContainer = card.closest('.col-md-6, .col-lg-6');
                
                if (productName.includes(searchTerm)) {
                    productContainer.style.display = '';
                } else {
                    productContainer.style.display = 'none';
                }
            });
        });
    }

    // Add product button (placeholder)
    const addProductBtn = document.querySelector('.add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            alert('Add New Product functionality will be implemented here.');
        });
    }

    // Update product button
    const updateProductBtn = document.querySelector('.edit-actions .btn-primary');
    if (updateProductBtn) {
        updateProductBtn.addEventListener('click', function() {
            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            
            // Here you would send the data to the server
            alert(`Product "${productName}" updated successfully!`);
        });
    }

    // Discard button
    const discardBtn = document.querySelector('.edit-actions .btn-secondary');
    if (discardBtn) {
        discardBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to discard changes?')) {
                // Reset form to original values
                const activeCard = document.querySelector('.product-card.active-card');
                if (activeCard) {
                    const productId = activeCard.getAttribute('data-product');
                    if (productId && products[productId]) {
                        updateEditPanel(products[productId]);
                    }
                }
            }
        });
    }

    // Pagination functionality
    const productsPerPage = 10;
    const totalProducts = 20;
    let currentPage = 1;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    function updatePagination() {
        // Get all product items
        const allProducts = Array.from(document.querySelectorAll('.product-item'));
        
        // Hide all products first
        allProducts.forEach(item => {
            item.style.display = 'none';
        });

        // Calculate which products to show
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, allProducts.length);
        
        // Show products for current page
        for (let i = startIndex; i < endIndex; i++) {
            if (allProducts[i]) {
                allProducts[i].style.display = 'block';
            }
        }

        // Update pagination info
        const start = startIndex + 1;
        const end = endIndex;
        const paginationInfo = document.getElementById('paginationInfo');
        if (paginationInfo) {
            paginationInfo.textContent = `Showing ${start} to ${end} of ${totalProducts} results`;
        }

        // Update pagination buttons
        updatePaginationButtons();
        
        // Re-setup product card listeners after pagination
        setupProductCardListeners();
        
        // Clear active card selection when changing pages
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.remove('active-card');
        });
    }

    function updatePaginationButtons() {
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const pageNumbers = document.querySelectorAll('.page-number');

        // Update prev/next buttons
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }

        // Update page number buttons
        pageNumbers.forEach(btn => {
            const pageNum = parseInt(btn.getAttribute('data-page'));
            btn.classList.remove('active');
            if (pageNum === currentPage) {
                btn.classList.add('active');
            }
        });

        // Show/hide dots and additional pages
        const pageDots = document.getElementById('pageDots');
        if (totalPages <= 2) {
            // Show only page 1 and 2
            pageNumbers.forEach(btn => {
                const pageNum = parseInt(btn.getAttribute('data-page'));
                if (pageNum <= 2) {
                    btn.style.display = 'inline-flex';
                } else {
                    btn.style.display = 'none';
                }
            });
            if (pageDots) pageDots.style.display = 'none';
        } else {
            // Show page 1, 2, and dots if needed
            pageNumbers.forEach(btn => {
                const pageNum = parseInt(btn.getAttribute('data-page'));
                if (pageNum <= 2) {
                    btn.style.display = 'inline-flex';
                } else {
                    btn.style.display = 'none';
                }
            });
            if (pageDots) pageDots.style.display = 'inline';
        }
    }

    // Pagination button handlers
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageNumbers = document.querySelectorAll('.page-number');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });
    }

    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageNum = parseInt(this.getAttribute('data-page'));
            currentPage = pageNum;
            updatePagination();
        });
    });

    // Initialize pagination
    updatePagination();
});
