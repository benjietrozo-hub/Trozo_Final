
<?php
session_start();

$increment = .5;

// Check if the time increment is set in the session
if(!isset($_SESSION['timeIncrement'])){
    $timeIncrement = $increment;
} else if($_SESSION['timeIncrement'] == 1){
   // If time increment is 1, set increment to 1
   $increment = 1;
   $timeIncrement =  $_SESSION['timeIncrement'];
} else if($_SESSION['timeIncrement'] >= 2) {
   // If time increment is greater than or equal to 2, set increment to 0
    $increment = 0;
    $timeIncrement =  $_SESSION['timeIncrement'];
}

// Update the time increment in the session
$_SESSION['timeIncrement'] = $timeIncrement + $increment;


?>

<!DOCTYPE html>
<html>
<head>
  <title>Sign In Form</title>
  <link rel="icon" href="../IMAGES/logo.png" type="image/x-icon">
  <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Log_in.css">
  
</head>
<body>
  <div class="container">
    <h2>Sign In</h2>
	<!-- Hidden input to store the time increment value -->
    <input type="hidden" id="timeIncrement" value="<?php echo $timeIncrement; ?>">
    <form id="form" class="form" action="" method="POST" >
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="(ex.@gmail.com)" required>

      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" style="width: 95%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"  id="passw" name="passw" required >
        <!-- Display error response if any -->

        <?= $response['error'] ?? null ?>
      </div>
	<!-- Message for too many attempts -->
      <p class="limitreach" style="color:red">Too many attempts!</p>
	<!-- Display total time left message -->
         <div style="color:black; text-align: center; " id="total-time-left"></div>
     
    </form>
 
   
  </div>
 
  </div>

  
<footer class="text-center p-2 mt-5">
  <p class="mb-0" style="color: #000000; background-color: white;">© 2024 All Rights Reserved.</p>
</footer>
</body>
<!-- Include JavaScript file for Timer functionality -->
<script src="../php/script.php?dir=js&file=Timer.js"></script>
</html>