<?php
session_start(); // MUST be at the very top
require '../DB/conn.php';

// --------------------------------------
// Developer reset via shortcut CTRL+SHIFT+S
// --------------------------------------
if (isset($_GET['reset_all_dev'])) {
    // Reset time increment session variable
    $_SESSION['timeIncrement'] = 0;

    // Reset attempts tracked in session (optional)
    $_SESSION['attempts'] = 0;

    // Reset login attempts for current IP in the database
    $ip = $_SERVER['REMOTE_ADDR']; // or use getIpAddr() if you prefer
    $stmt = $conn->prepare("DELETE FROM attempt WHERE ip=?");
    $stmt->bind_param("s", $ip);
    $stmt->execute();

    // Redirect cleanly to login page
    header("Location: Sign_in.php");
    exit();
}

// If returning from a completed long (fourth-batch) lock, reset the lock batches
if (isset($_GET['reset_lock']) && $_GET['reset_lock'] === '1') {
    unset($_SESSION['timeIncrement']);
}

// Redirect logged-in users directly to dashboard
if (isset($_SESSION['user_id'])) {
    header("Location: Admin_Dashboard.php");
    exit();
}

// Function to get client IP
function getIpAddr() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return $_SERVER['HTTP_X_FORWARDED_FOR'];
    return $_SERVER['REMOTE_ADDR'];
}

$response = [];

// -------------------------
// Login form processing
// -------------------------
if (isset($_POST['submit'])) {
    $ip = getIpAddr();
    $time = time() - 15; // 15-second window for attempts

    // Count recent attempts for this IP
    $stmt = $conn->prepare("SELECT COUNT(*) AS total_count FROM attempt WHERE ip = ? AND login_time > ?");
    $stmt->bind_param("si", $ip, $time);
    $stmt->execute();
    $result = $stmt->get_result();
    $total_count = $result->fetch_assoc()['total_count'];

    if ($total_count >= 3) {
        header('Location: A_denied.php');
        exit();
    } else {
        $username = $_POST['username'] ?? '';
        $password = $_POST['passw'] ?? '';

        $stmt = $conn->prepare("SELECT * FROM `infos` WHERE `username` = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['passw'])) {
            // Successful login
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_fname'] = $user['firstname'];

            // Clear any previous attempts for this IP
            $stmt = $conn->prepare("DELETE FROM attempt WHERE ip=?");
            $stmt->bind_param("s", $ip);
            $stmt->execute();

            // Reset timer batch if exists
            unset($_SESSION['timeIncrement']);
            header("Location: Admin_Dashboard.php");
            exit();
        } else {
            // Failed login, insert attempt
            $login_time = time();
            $stmt = $conn->prepare("INSERT INTO attempt(ip, login_time) VALUES (?, ?)");
            $stmt->bind_param("si", $ip, $login_time);
            $stmt->execute();

            $total_count++;
            $rem_attm = 3 - $total_count;
            if ($rem_attm <= 0) {
                header('Location: denied.php?username=' . urlencode($username));
                exit();
            } else {
                $response['error'] = "<span style='color: red; text-align: center;'>Incorrect username or password. $rem_attm attempts remaining.</span>";
            }
        }
    }
}
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
            <h3 class="text-center mb-4" style="color:rgb(8, 1, 1); font-size: 36px;">LOGIN</h3>

            <form action="" method="POST" onsubmit="return loginValidation()">

              <div class="form-outline mb-2">
                <label class="form-label" style="font-weight: bold;">Username</label>
                <input type="text" class="form-control" name="username" maxlength="20" value="<?= htmlspecialchars($_POST['username'] ?? "") ?>" />
                <span id="username_val" style="color:#972532;"></span>
              </div>

              <div class="form-outline mb-2">
                <label class="form-label" style="font-weight: bold;">Password</label>
                <input type="password" class="form-control" name="passw" maxlength="15" />
                <span id="password_val" style="color:#972532;"></span>
              </div>

              <div class="text-center mb-2">
                <?= $response['error'] ?? '' ?>
              </div>

              <button type="submit" class="btn btn-primary w-100" name="submit">LOGIN</button>

              <div class="text-center mt-2">
                <!-- <a href="forgot_password.php" style="font-size: medium; color: black; font-weight: bold;">Forgot Password?</a> -->
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="text-center p-3 mt-5" style="background-color: rgba(15, 9, 9, 0.83); color: white; backdrop-filter: blur(3px); border: 2px solid rgba(0, 0, 0, 0.1); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <p class="mb-1" style="font-size: 20px;">
    <img src="../IMAGES/logo.png" style="height: 30px; margin-right: 10px;">
    <strong>Benz Sneakers Online Store</strong>. All Rights Reserved © 2024.
  </p>
  <p style="font-size: 18px;">
    <a href="#" style="color: white; text-decoration: none;">Privacy Policy</a> |
    <a href="#" style="color: white; text-decoration: none;">Terms of Service</a>
  </p>
</footer>
<script>
  // If a lockout timer is active, immediately send the user back to denied.php
  (function () {
    try {
      var stored = localStorage.getItem('count_timer');
      if (stored && parseInt(stored, 10) > 0) {
        window.location.href = 'denied.php';
      }
    } catch (e) {
      // Ignore storage errors
    }
  })();
</script>
<script src="../php/script.php?dir=js&file=Timer.js"></script>
<script src="../php/script.php?dir=js&file=login_val.js"></script>
<script src="../php/script.php?dir=js&file=sign_in.js"></script>

</body>
</html>
