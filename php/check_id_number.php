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
    die("Connection failed: " . $con->connect_error); // Exit if connection fails
}

// Get the ID number from the query string, defaulting to an empty string if not set
$idnumber = isset($_GET['idnumber']) ? $_GET['idnumber'] : '';

if ($idnumber !== '') { // Proceed only if an ID number is provided
    // Prepare a statement to check if the ID number exists
    $stmt = $con->prepare("SELECT COUNT(*) AS count FROM infos WHERE idnumber = ?");
    $stmt->bind_param("s", $idnumber); // Bind the parameter

    $stmt->execute(); // Execute the prepared statement
    $result = $stmt->get_result(); // Get the result set
    $row = $result->fetch_assoc(); // Fetch the result as an associative array

    // Check if the ID number exists and return a JSON response
    if ($row['count'] > 0) {
        echo json_encode(['exists' => true]); // ID number exists
    } else {
        echo json_encode(['exists' => false]); // ID number does not exist
    }

    $stmt->close(); // Close the prepared statement
}

$con->close(); // Close the database connection
?>
