<?php
require '../DB/conn.php';

if (isset($_POST['password'])) {
    $password = $_POST['password'];
    
    // Get all hashed passwords from the database
    $stmt = $conn->prepare("SELECT passw FROM infos");
    $stmt->execute();
    $result = $stmt->get_result();
    
    $exists = false;
    while ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['passw'])) {
            $exists = true;
            break;
        }
    }
    
    $response = array(
        'exists' => $exists
    );
    
    header('Content-Type: application/json');
    echo json_encode($response);
}
?> 