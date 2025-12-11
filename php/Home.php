<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // Redirect to the login page
    header("Location: Sign_in.php");
    exit();
}
?>

<!DOCTYPE html>
<html>

<head>
  <title>Welcome User!!</title>
  <link rel="icon" href="../IMAGES/logo.png" type="image/x-icon">
  <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Log_in.css">
  <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Home.css">
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-light">
  

  <a class="navbar-brand" href="Sign_in.php">
  <h1 style="font-size: 3em; margin: 10px; color: white">Benz Sneakers Store </h1>
  <p class="bookstore">Step in Style</p>

  </a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>


<li class="nav-item">
  <a class="nav-link" href="../php/script.php?dir=php&file=Sign_out.php">
    <i class="fas fa-sign-out-alt logout-icon" style="color: white;"></i>
    <span class="nav-text logout-text" style="color: black; font-size: 20px; margin-left: 1100px; ">LOG OUT</span>
  </a>
</li>



    </ul>
  </div>
</nav>

  <!-- Section: Design Block -->
  <section class="">
  <div class="d-flex justify-content-center align-items-center" style="height: 150px;">
  <div class="px-4 py-5 px-md-5 text-lg-start">
    <!-- Content -->
  </div>
</div>
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-3">
          
          </div>
          <footer class="text-center p-3 mt-5" style="background-color: rgba(8, 7, 7, 0.76); color: white; display: flex; flex-direction: column; justify-content:  center; backdrop-filter: blur(3px); border-radius: 10px; border: 2px solid rgba(0, 0, 0, 0.1); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-left: -385px">
  <p class="mb-1" style="font-size: 20px; margin: 0; color:white; display: flex; align-items: center; justify-content: center;">
  <img src="../IMAGES/logo.png" style="height: 30px; margin-right: 10px;">
  <strong>Online Bookstore System</strong>. All Rights Reserved © 2024.
  </p>
  <p style="font-size: 18px; margin: 5px 0; color: white;">
    <a href="#" style="color: white; text-decoration: none;">Privacy Policy</a> | 
    <a href="#" style="color: white; text-decoration: none;">Terms of Service</a>
  </p>
</footer>

</section>

</body>

</html>