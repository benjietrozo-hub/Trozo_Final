<?php
session_start();

// Redirect if user is not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: Sign_in.php");
    exit();
}

$firstName = htmlspecialchars($_SESSION['user_fname'] ?? 'Admin');
$fullName = htmlspecialchars($_SESSION['user_fname'] ?? 'Admin');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benz Sneaker Store - Admin Dashboard</title>
    <link rel="icon" href="../IMAGES/logo.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Admin_Dashboard.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>

<!-- Sidebar -->
<aside class="sidebar">
    <div class="sidebar-header">
        <img src="../IMAGES/logo.png" alt="Benz Sneakers" class="sidebar-logo">
        <h2 class="sidebar-title">Benz Sneaker Store</h2>
    </div>
    
    <nav class="sidebar-nav">
        <a href="#" class="nav-link-item">
            <i class="fas fa-th-large"></i>
            <span>Dashboard</span>
        </a>
        <a href="#" class="nav-link-item active">
            <i class="fas fa-box"></i>
            <span>Products</span>
        </a>
        <a href="#" class="nav-link-item">
            <i class="fas fa-shopping-cart"></i>
            <span>Purchases</span>
        </a>
        <a href="#" class="nav-link-item">
            <i class="fas fa-users"></i>
            <span>Customers</span>
        </a>
        <a href="#" class="nav-link-item">
            <i class="fas fa-chart-line"></i>
            <span>Analytics</span>
        </a>
        <a href="#" class="nav-link-item">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </a>
    </nav>
</aside>

<!-- Main Content Area -->
<div class="main-wrapper">
    <!-- Top Navigation Bar -->
    <nav class="top-navbar">
        <div class="navbar-left">
            <h1 class="navbar-brand"></h1>
    </div>

        <div class="navbar-right">
            <div class="user-profile-dropdown" id="userProfileDropdown">
                <div class="user-profile-trigger">
                    <div class="user-avatar">
        <span class="user-initials"><?= strtoupper(substr($firstName, 0, 1)) ?></span>
                    </div>
                    <span class="user-name"><?= $fullName ?></span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="dropdown-menu" id="profileDropdownMenu">
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-user"></i>
                        <span>Profile</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="Sign_out.php" class="dropdown-item logout-item">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
    </div>
</nav>

    <!-- Dashboard Content -->
    <div class="dashboard-content">
        <!-- Header Section -->
    <div class="header-section">
        <h1 class="page-title">Products</h1>
        <div class="action-bar">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search product..." class="form-control">
            </div>
            <button class="btn btn-primary add-product-btn">
                <i class="fas fa-plus"></i> Add New Product
            </button>
        </div>
    </div>
    
        <!-- Filter Tabs -->
    <div class="filter-tabs">
            <button class="tab-btn">All products</button>
            <button class="tab-btn active">Most purchased</button>
        <button class="tab-btn">Basketball</button>
        <button class="tab-btn">Running</button>
        <button class="tab-btn">Skateboard</button>
        <button class="tab-btn">Football</button>
            <button class="tab-btn">Fun Sneakers</button>
        <button class="tab-btn">New Arrivals</button>
        
        <div class="sort-dropdown">
                <i class="fas fa-bars"></i>
            <span>Sort by:</span>
            <select class="form-select">
                <option selected>Highest Stock</option>
                <option>Lowest Price</option>
                <option>Date Added</option>
            </select>
        </div>
    </div>

        <!-- Main Content Grid -->
        <div class="content-grid">
            <!-- Left Panel - Products List -->
            <div class="products-panel">
    <div class="product-grid row">
                    <!-- Product 1 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card active-card" data-product="nike-downshifter-12">
                            <img src="../IMAGES/sample1.jpg" alt="Nike Downshifter 12" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Nike Downshifter 12</h5>
                    <p class="card-price">Rp 819,000</p>
                    <div class="card-stats">
                                    <span>Stock <strong>975</strong></span>
                                    <span class="sold-stat">Sold <strong>768</strong></span>
                    </div>
                </div>
            </div>
        </div>

                    <!-- Product 2 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="compass-retrograde">
                            <img src="../IMAGES/sample2.jpg" alt="Compass Retrograde" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Compass Retrograde High...</h5>
                    <p class="card-price">Rp 668,000</p>
                    <div class="card-stats">
                                    <span>Stock <strong>494</strong></span>
                                    <span class="sold-stat">Sold <strong>341</strong></span>
                    </div>
                </div>
            </div>
        </div>
        
                    <!-- Product 3 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="adidas-superstar">
                            <img src="../IMAGES/sample3.webp" alt="Adidas Superstar" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Adidas Superstar XRLG Green...</h5>
                    <p class="card-price">Rp 2,000,000</p>
                    <div class="card-stats">
                                    <span>Stock <strong>624</strong></span>
                                    <span class="sold-stat">Sold <strong>489</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 4 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="vans-old-skool">
                            <img src="../IMAGES/sample4.jpg" alt="Vans Old Skool" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Vans Old Skool Shoe</h5>
                                <p class="card-price">Rp 899,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>342</strong></span>
                                    <span class="sold-stat">Sold <strong>256</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 5 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="nike-air-max-90">
                            <img src="../IMAGES/sample5.jpg" alt="Nike Air Max 90" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Air Max 90</h5>
                                <p class="card-price">Rp 1,599,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>523</strong></span>
                                    <span class="sold-stat">Sold <strong>412</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 6 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="nike-air-max-pulse">
                            <img src="../IMAGES/sample6.jpg" alt="Nike Air Max Pulse" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Air Max Pulse</h5>
                                <p class="card-price">Rp 1,299,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>456</strong></span>
                                    <span class="sold-stat">Sold <strong>389</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 7 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="nike-air-force">
                            <img src="../IMAGES/sample7.jpg" alt="Nike Air Force 1" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Air Force 1 '07</h5>
                                <p class="card-price">Rp 1,199,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>678</strong></span>
                                    <span class="sold-stat">Sold <strong>567</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 8 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="nike-air-max-97">
                            <img src="../IMAGES/sample8.jpg" alt="Nike Air Max 97" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Air Max 97</h5>
                                <p class="card-price">Rp 1,799,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>389</strong></span>
                                    <span class="sold-stat">Sold <strong>298</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 9 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="nike-dunk-low">
                            <img src="../IMAGES/sample9.jpg" alt="Nike Dunk Low" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Dunk Low</h5>
                                <p class="card-price">Rp 1,499,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>567</strong></span>
                                    <span class="sold-stat">Sold <strong>445</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 10 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="1">
                        <div class="product-card" data-product="nike-court-vision">
                            <img src="../IMAGES/sample10.jpg" alt="Nike Court Vision" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Court Vision Low</h5>
                                <p class="card-price">Rp 999,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>712</strong></span>
                                    <span class="sold-stat">Sold <strong>589</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 11 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="adidas-ultraboost">
                            <img src="../IMAGES/sample11.jpg" alt="Adidas Ultraboost" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Adidas Ultraboost 22</h5>
                                <p class="card-price">Rp 2,499,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>423</strong></span>
                                    <span class="sold-stat">Sold <strong>356</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 12 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="adidas-stan-smith">
                            <img src="../IMAGES/sample12.jpg" alt="Adidas Stan Smith" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Adidas Stan Smith</h5>
                                <p class="card-price">Rp 1,299,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>589</strong></span>
                                    <span class="sold-stat">Sold <strong>478</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 13 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="nike-blazer-mid">
                            <img src="../IMAGES/sample1.jpg" alt="Nike Blazer Mid" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Blazer Mid '77</h5>
                                <p class="card-price">Rp 1,399,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>634</strong></span>
                                    <span class="sold-stat">Sold <strong>512</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 14 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="nike-revolution-6">
                            <img src="../IMAGES/sample2.jpg" alt="Nike Revolution 6" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Revolution 6</h5>
                                <p class="card-price">Rp 899,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>756</strong></span>
                                    <span class="sold-stat">Sold <strong>623</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 15 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="adidas-nmd-r1">
                            <img src="../IMAGES/sample3.webp" alt="Adidas NMD R1" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Adidas NMD R1</h5>
                                <p class="card-price">Rp 2,199,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>445</strong></span>
                                    <span class="sold-stat">Sold <strong>367</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 16 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="vans-authentic">
                            <img src="../IMAGES/sample4.jpg" alt="Vans Authentic" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Vans Authentic</h5>
                                <p class="card-price">Rp 799,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>523</strong></span>
                                    <span class="sold-stat">Sold <strong>412</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 17 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="nike-zoom-fly">
                            <img src="../IMAGES/sample5.jpg" alt="Nike Zoom Fly" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Zoom Fly 5</h5>
                                <p class="card-price">Rp 1,899,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>378</strong></span>
                                    <span class="sold-stat">Sold <strong>289</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 18 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="nike-pegasus-40">
                            <img src="../IMAGES/sample6.jpg" alt="Nike Pegasus 40" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Pegasus 40</h5>
                                <p class="card-price">Rp 1,699,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>512</strong></span>
                                    <span class="sold-stat">Sold <strong>401</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 19 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="adidas-gazelle">
                            <img src="../IMAGES/sample7.jpg" alt="Adidas Gazelle" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Adidas Gazelle</h5>
                                <p class="card-price">Rp 1,499,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>467</strong></span>
                                    <span class="sold-stat">Sold <strong>378</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 20 -->
                    <div class="col-md-6 col-lg-6 mb-4 product-item" data-page="2">
                        <div class="product-card" data-product="nike-jordan-1">
                            <img src="../IMAGES/sample8.jpg" alt="Nike Jordan 1" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">Nike Air Jordan 1 Low</h5>
                                <p class="card-price">Rp 2,299,000</p>
                                <div class="card-stats">
                                    <span>Stock <strong>334</strong></span>
                                    <span class="sold-stat">Sold <strong>267</strong></span>
                                </div>
                    </div>
                </div>
            </div>
        </div>
        
                <!-- Pagination -->
                <div class="pagination-section">
                    <span class="pagination-info" id="paginationInfo">Showing 1 to 10 of 20 results</span>
                    <div class="pagination-controls" id="paginationControls">
                        <button class="page-btn" id="prevPage" disabled><i class="fas fa-chevron-left"></i></button>
                        <button class="page-btn page-number active" data-page="1">1</button>
                        <button class="page-btn page-number" data-page="2">2</button>
                        <span class="page-dots" id="pageDots" style="display: none;">...</span>
                        <button class="page-btn" id="nextPage"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
        </div>
        
            <!-- Right Panel - Edit Products -->
            <div class="edit-panel">
                <div class="edit-panel-header">
                    <h2 class="edit-title">Edit Products</h2>
                    <a href="#" class="full-view-link">See full view →</a>
                </div>

                <!-- Tabs -->
                <div class="edit-tabs">
                    <button class="edit-tab active" data-tab="descriptions">Descriptions</button>
                    <button class="edit-tab" data-tab="inventory">Inventory</button>
                    <button class="edit-tab" data-tab="pricing">Pricing</button>
                </div>

                <!-- Tab Content -->
                <div class="tab-content">
                    <!-- Descriptions Tab -->
                    <div class="tab-pane active" id="descriptions">
                        <div class="product-image-large">
                            <img src="../IMAGES/sample1.jpg" alt="Nike Downshifter 12" id="editProductImage">
                        </div>

                        <div class="form-section">
                            <h3 class="section-title">Description</h3>
                            <div class="form-group">
                    <label class="form-label">Product Name</label>
                                <input type="text" id="productName" class="form-control" value="Nike Downshifter 12">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" rows="6" id="productDescription">The Nike Downshifter 12 provides lightweight cushioning and responsive support for your daily runs. Featuring a breathable mesh upper and durable rubber outsole, these shoes offer comfort and performance for every step of your journey.</textarea>
                            </div>
                        </div>

                        <div class="form-section">
                            <h3 class="section-title">Category</h3>
                            <div class="form-group">
                                <label class="form-label">Product Category</label>
                                <input type="text" class="form-control" value="Running">
                            </div>
                        </div>
                    </div>

                    <!-- Inventory Tab -->
                    <div class="tab-pane" id="inventory">
                        <div class="form-section">
                            <h3 class="section-title">Stock Information</h3>
                            <div class="form-group">
                                <label class="form-label">Current Stock</label>
                                <input type="number" class="form-control" value="975">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Total Sold</label>
                                <input type="number" class="form-control" value="768" readonly>
                            </div>
                        </div>
                    </div>

                    <!-- Pricing Tab -->
                    <div class="tab-pane" id="pricing">
                        <div class="form-section">
                            <h3 class="section-title">Pricing</h3>
                            <div class="form-group">
                                <label class="form-label">Price (Rp)</label>
                                <input type="text" class="form-control" value="819,000">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Discount (%)</label>
                                <input type="number" class="form-control" value="0" min="0" max="100">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="edit-actions">
                    <button class="btn btn-secondary">Discard</button>
                    <button class="btn btn-primary">Update Product</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../php/script.php?dir=js&file=admin_dashboard.js"></script>
</body>
</html>
