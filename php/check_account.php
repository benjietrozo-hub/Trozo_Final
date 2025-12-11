<?php
require '../DB/conn.php';

if (isset($_POST['username'])) {
    $username = trim($_POST['username']);
    $password = isset($_POST['password']) ? $_POST['password'] : null;
    
    $stmt = $conn->prepare("SELECT * FROM `infos` WHERE `username` = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    $response = array(
        'exists' => ($user !== null)
    );
    
    // If password is provided, verify it
    if ($password !== null && $user) {
        $response['passwordCorrect'] = password_verify($password, $user['passw']);
        
        // If login is successful, clear attempts
        if ($response['passwordCorrect']) {
            $ip = getIpAddr();
            $stmt = $conn->prepare("DELETE FROM attempt WHERE ip=?");
            $stmt->bind_param("s", $ip);
            $stmt->execute();
            
            // Start session if not already started
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            // Clear lockout session variables
            unset($_SESSION['timeIncrement']);
            unset($_SESSION['attemptGroup']);
            unset($_SESSION['lockoutDuration']);
        }
    }
    
    header('Content-Type: application/json');
    echo json_encode($response);
}

function getIpAddr() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    return $_SERVER['REMOTE_ADDR'];
}
?> 