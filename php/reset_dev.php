<?php
session_start();
require '../DB/conn.php';

header('Content-Type: application/json'); // Tell JS this is JSON

// --------------------------------------
// Developer reset via shortcut CTRL+SHIFT+S
// --------------------------------------
if (isset($_GET['reset_all_dev'])) {
    
    // 1. Reset the Batch Timer
    unset($_SESSION['timeIncrement']);
    
    // 2. Reset specific session attempts
    unset($_SESSION['attempts']);

    // 3. Clear Database Attempts for this IP
    $ip = $_SERVER['REMOTE_ADDR'];
    // Handle proxy IPs if necessary
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) $ip = $_SERVER['HTTP_CLIENT_IP'];
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];

    $stmt = $conn->prepare("DELETE FROM attempt WHERE ip=?");
    $stmt->bind_param("s", $ip);
    
    if($stmt->execute()){
        echo json_encode(['status' => 'ok', 'message' => 'Reset complete']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'DB Error']);
    }
    
    exit(); // Stop execution here
}

// If accessed directly without parameter
echo json_encode(['status' => 'error', 'message' => 'No action specified']);
?>