<?php 
// Start a PHP session
session_start();

// Establish a database connection
$con = new mysqli('localhost', 'root', '', 'trozo_security');

// Unset and destroy the session
session_unset();
session_destroy();

// Redirect to the sign-in page
header('location:..//php/Sign_in.php');


?>
