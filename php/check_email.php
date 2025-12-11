<?php
// Database connection parameters
$host = "localhost"; // MySQL server address
$db_username = "root"; // MySQL username
$db_password = ""; // MySQL password
$db_name = "trozo_security"; // Database name

// Create a new MySQLi connection
$con = new mysqli($host, $db_username, $db_password, $db_name);

// Check if the connection was successful
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Get the email from the query string
$email = isset($_GET['email']) ? trim($_GET['email']) : '';

if ($email !== '') {
    // Prepare a statement to check if the email exists
    $stmt = $con->prepare("SELECT COUNT(*) AS count FROM infos WHERE email = ?");
    $stmt->bind_param("s", $email); // Bind the email parameter

    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // Return JSON response
    echo json_encode(['exists' => $row['count'] > 0]);

    $stmt->close();
}

$con->close();
?>
