<?php
include '../DB/conn.php'; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $idnumber = $_POST['idnumber'];

    // Check if the email exists
    $verify_email_query = mysqli_query($conn, "SELECT email FROM infos WHERE email='$email'");
    if (mysqli_num_rows($verify_email_query) != 0) {
        echo 'email_exists';
        exit;
    }

    // Check if the username exists
    $verify_username_query = mysqli_query($conn, "SELECT username FROM infos WHERE username='$username'");
    if (mysqli_num_rows($verify_username_query) != 0) {
        echo 'username_exists';
        exit;
    }

    // Check if the ID number exists
    $verify_idnumber_query = mysqli_query($conn, "SELECT idnumber FROM infos WHERE idnumber='$idnumber'");
    if (mysqli_num_rows($verify_idnumber_query) != 0) {
        echo 'idnumber_exists';
        exit;
    }

    echo 'valid'; // Everything is fine
}
?>
