<?php
session_start();

// Initialize variables
$timeIncrement = 0.5;
$increment = 0;

// Logic to determine the Batch Level
if (!isset($_SESSION['timeIncrement'])) {
    $timeIncrement = 0.5; // Batch 1 (15s)
    $increment = 0.5;
} 
else {
    $current_level = $_SESSION['timeIncrement'];
    if ($current_level <= 0.5) {
        $timeIncrement = 1;   // Batch 2 (30s)
        $increment = 1;
    } else if ($current_level <= 1) {
        $timeIncrement = 2;   // Batch 3 (60s)
        $increment = 1;
    } else {
        $timeIncrement = 3;   // Batch 4 (15 mins) - LOCKOUT MODE
        $increment = 0;
    }
}

$_SESSION['timeIncrement'] = $timeIncrement;
$response = []; 
?>

<!DOCTYPE html>
<html>
<head>
    <title>Step in Style</title>
    <link rel="icon" href="../IMAGES/logo.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Log_in.css">
    <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Sign_in.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <style>
        /* 1. UN-FIX THE FOOTER so it doesn't block content */
        footer {
            position: relative !important; /* Changed from fixed to relative */
            bottom: auto !important;
            margin-top: 50px !important;   /* Pushes footer down */
            width: 100%;
            background-color: rgba(15, 9, 9, 0.83); /* Keep your background */
            color: white;
            padding: 10px;
        }

        /* 2. Compact the Card Spacing */
        .card-body {
            padding-top: 2rem !important;    /* Reduce top padding */
            padding-bottom: 2rem !important; /* Reduce bottom padding */
        }

        /* 3. Text Alignment & Colors */
        .card-body p {
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: center !important;
            color: #333 !important;
            width: 100% !important;
        }

        /* 4. Lock Icon Styling (More compact) */
        .locked-icon {
            font-size: 3rem !important;
            color: #dc3545 !important;
            display: block;
            margin: 0 auto 10px auto !important; /* Reduced bottom margin */
        }

        /* 5. Locked Title Styling */
        .locked-title {
            color: #dc3545 !important;
            font-size: 22px !important; /* Slightly smaller to fit better */
            font-weight: 800 !important;
            text-align: center !important;
            margin-bottom: 5px !important;
            text-transform: uppercase;
        }

        /* 6. Locked Subtitle Styling */
        .locked-subtitle {
            color: #c82333 !important;
            font-size: 13px !important;
            font-weight: bold !important;
            text-align: center !important;
            line-height: 1.4 !important;
            margin-bottom: 15px !important;
        }

        /* 7. Timer Styling */
        #total-time-left {
            font-size: 1.1rem;
            font-weight: bold;
            color: #d9534f !important;
            margin-top: 10px;
            text-align: center;
        }
        
        .limitreach {
            color: red !important;
            margin-left: 0 !important;
            text-align: center !important;
            width: 100%;
            margin-top: 10px !important;
        }
    </style>
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand d-flex flex-column" href="Sign_in.php">
        <h1>Benz Sneakers</h1>
        <p class="bookstore">Step in Style</p>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#"><i class="fas fa-home"></i> <span style="font-size: 18px;">Home</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../php/script.php?dir=php&file=Register.php">
                    <i class="fas fa-user-plus" style="color: white;"></i>
                    <span style="font-size: 18px; color: white;">Register</span>
                </a>
            </li>
        </ul>
    </div>
</nav>

<section class="mt-4">
    <div class="container">
        <div class="row gx-lg-5 align-items-center justify-content-center">
            <div class="col-lg-5 text-center mb-4">
                <img src="../IMAGES/logo.png" alt="Logo" class="login-logo img-fluid">
            </div>

            <div class="col-lg-6">
                <div class="card shadow-lg">
                    <div class="card-body py-5 px-md-5">

                        <?php if ($timeIncrement >= 3): ?>
                            <div class="locked-container text-center mb-2">
                                <i class="fas fa-lock locked-icon"></i>
                                <h3 class="locked-title">ACCOUNT LOCKED</h3>
                                <p class="locked-subtitle">
                                    Your account is temporarily locked for security reasons.<br>
                                    Please contact the administrator.
                                </p>
                            </div>
                        <?php else: ?>
                            <h3 class="text-center mb-4" style="color:rgb(8, 1, 1); font-size: 36px;">LOGIN</h3>
                        <?php endif; ?>

                        <form action="" method="POST">
                            <input type="hidden" id="timeIncrement" value="<?php echo htmlspecialchars($timeIncrement); ?>">

                            <div class="form-outline mb-2">
                                <label class="form-label" style="font-weight: bold;">Username</label>
                                <input type="text" class="form-control" name="username" maxlength="20" 
                                    value="<?= htmlspecialchars($_GET['username'] ?? "") ?>" required />
                            </div>

                            <div class="form-outline mb-2">
                                <label class="form-label" style="font-weight: bold;">Password</label>
                                <input type="password" class="form-control" name="passw" maxlength="15" 
                                    placeholder="Password" required />
                            </div>

                            <div class="text-center mb-2">
                                <?= $response['error'] ?? '' ?>
                            </div>

                            <button type="submit" class="btn btn-primary w-100" name="submit">LOGIN</button>

                            <p class="limitreach">Excessive attempts!</p>
                            
                            <div id="total-time-left"></div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    var timeIncrement = <?php echo ($timeIncrement > 0) ? 'true' : 'false'; ?>;
</script>
<script src="../php/script.php?dir=js&file=denied.js"></script>

<footer class="text-center p-3">
    <p class="mb-1" style="font-size: 20px;">
        <img src="../IMAGES/logo.png" style="height: 30px; margin-right: 10px;">
        <strong>Benz Sneakers Online Store</strong>. All Rights Reserved 2024.
    </p>
    <p style="font-size: 18px;">
        <a href="#" style="color: white; text-decoration: none;">Privacy Policy</a> |
        <a href="#" style="color: white; text-decoration: none;">Terms of Service</a>
    </p>
</footer>

<script src="../php/script.php?dir=js&file=Timer.js"></script>
</body>
</html>