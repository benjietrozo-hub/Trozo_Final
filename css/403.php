<?php
http_response_code(403);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Access Forbidden - Benz Sneaker Store</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f6f9;
        }
        .error-container {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        h1 {
            color: #dc3545;
            font-size: 3em;
            margin: 0;
        }
        p {
            color: #6c757d;
            font-size: 1.2em;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>403</h1>
        <p>Access Forbidden</p>
        <p style="font-size: 1em;">Direct access to this file is not allowed.</p>
    </div>
</body>
</html>

