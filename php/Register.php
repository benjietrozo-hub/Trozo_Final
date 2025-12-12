<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: Admin_Dashboard.php");
    exit();
}

// Check if the form is submitted using the POST method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Include the file that connects to the database
    include '../DB/conn.php';

    // Get and validate required fields
    $required_fields = [
        'idnumber', 'firstname', 'lastname', 'sex', 'age', 'birth',
        'email', 'username', 'passw', 'cpassword', 'street', 'barangay',
        'municipality', 'province', 'postal', 'country'
    ];

    $errors = [];
    $data = [];

    // Validate all required fields are present and not empty
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || trim($_POST[$field]) === '') {
            $errors[] = ucfirst($field) . " is required";
        } else {
            $data[$field] = trim($_POST[$field]);
        }
    }

    // Get optional fields
    $data['middlename'] = trim($_POST['middlename'] ?? '');
    $data['suffix'] = trim($_POST['suffix'] ?? '');

    if (empty($errors)) {
        // Compare the entered password with the confirmed password
        if ($data['passw'] !== $data['cpassword']) {
            echo "<script>alert('Both of the passwords do not match!');</script>";
            echo "<script>window.history.back();</script>";
        } else {
            // Server-side check: prevent using a password that already exists in the database
            // This mirrors the client-side real-time check for robustness when JS is disabled
            try {
                $dup_stmt = mysqli_prepare($conn, "SELECT passw FROM infos");
                if ($dup_stmt && mysqli_stmt_execute($dup_stmt)) {
                    $dup_result = mysqli_stmt_get_result($dup_stmt);
                    $password_in_use = false;
                    while ($row = mysqli_fetch_assoc($dup_result)) {
                        if (password_verify($data['passw'], $row['passw'])) {
                            $password_in_use = true;
                            break;
                        }
                    }
                    mysqli_stmt_close($dup_stmt);
                    if ($password_in_use) {
                        echo "<script>alert('This password is already in use. Please choose a different password.');</script>";
                        echo "<script>window.history.back();</script>";
                        exit();
                    }
                }
            } catch (Exception $e) {
                // If an error occurs during duplicate check, proceed without blocking but log it
                echo "<script>console.log('Duplicate password check error: " . addslashes($e->getMessage()) . "');</script>";
            }

            // Hash the password
            $password = password_hash($data['passw'], PASSWORD_BCRYPT);

            // Use prepared statement for insertion
            $insert_query = "INSERT INTO `infos` (
                `idnumber`, `firstname`, `lastname`, `middlename`, `suffix`, 
                `sex`, `age`, `birth`, `email`, `username`, `passw`, 
                `street`, `barangay`, `municipality`, `province`, `postal`, `country`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = mysqli_prepare($conn, $insert_query);
            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "ssssssissssssssss", 
                    $data['idnumber'], 
                    $data['firstname'], 
                    $data['lastname'], 
                    $data['middlename'], 
                    $data['suffix'],
                    $data['sex'],
                    $data['age'],
                    $data['birth'],
                    $data['email'],
                    $data['username'],
                    $password,
                    $data['street'],
                    $data['barangay'],
                    $data['municipality'],
                    $data['province'],
                    $data['postal'],
                    $data['country']
                );

                if (mysqli_stmt_execute($stmt)) {
                    echo "<script>alert('Account created successfully!');</script>";
                    echo "<script>window.location.href='Sign_in.php';</script>";
                    exit();
                } else {
                    $error = mysqli_stmt_error($stmt);
                    if (strpos($error, 'Duplicate entry') !== false) {
                        if (strpos($error, 'idnumber') !== false) {
                            echo "<script>alert('This ID number is already registered!');</script>";
                        } else if (strpos($error, 'email') !== false) {
                            echo "<script>alert('This email is already registered!');</script>";
                        } else if (strpos($error, 'username') !== false) {
                            echo "<script>alert('This username is already taken!');</script>";
                        } else {
                            echo "<script>alert('Error: Duplicate entry detected.');</script>";
                        }
                    } else {
                        echo "<script>alert('Error creating account: " . addslashes($error) . "');</script>";
                    }
                    echo "<script>console.log('SQL Error: " . addslashes($error) . "');</script>";
                    echo "<script>window.history.back();</script>";
                }
                mysqli_stmt_close($stmt);
            } else {
                echo "<script>alert('Error preparing statement: " . addslashes(mysqli_error($conn)) . "');</script>";
                echo "<script>console.log('Prepare Error: " . addslashes(mysqli_error($conn)) . "');</script>";
                echo "<script>window.history.back();</script>";
            }
            mysqli_close($conn);
        }
    } else {
        echo "<script>alert('Please fill in all required fields: " . addslashes(implode(", ", $errors)) . "');</script>";
        echo "<script>window.history.back();</script>";
    }
}
?>



<!DOCTYPE html>
<html>

<head>
  <title>Step in Style</title>
  <!-- <link rel="stylesheet" href="../CSS_FILES/Reg_form.css"> -->
  <link rel="icon" href="../IMAGES/logo.png" type="image/x-icon">
  <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Log_in.css">
  <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="../php/script.php?dir=css&file=Register.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

</head>

<body>
<nav class="navbar navbar-expand-lg navbar-light">
 
  <a class="navbar-brand" href="Sign_in.php">
    <img src="../IMAGES/logo.png" alt="Benz Sneakers Logo" class="navbar-logo">
    <div>
        <h1 style="font-size: 2.5em; margin: 10px;">Benz Sneakers</h1>
        <p class="bookstore">Step In Style</p>
    </div>
  </a>

<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav ml-auto">
  <li class="nav-item active">
  <a class="nav-link" href="#" style="font-size: 20px;">
    <i class="fas fa-home" ></i> HOME <span class="sr-only">(current)</span>
  </a>
</li>

    <li class="nav-item">
  <a class="nav-link" href="../php/script.php?dir=php&file=Sign_in.php" style="font-size: 20px;">
    <i class="fas fa-sign-in-alt"></i> LOGIN
  </a>
</li>

  </ul>
</div>
</nav>

<div class="main-content">
    <div class="container">
      <div class="row justify-content-center gx-lg-3 align-items-center">
        <div class="col-lg-9 mb-0">
          <div class="card">
            <div class="card-body py-2 px-md-3">
              <form action="" method="POST" id="registrationForm" class="form">
                <div class="form-title mb-1">
                  <h2 class="fw-bold" style="text-align: left; color: #000000; font-size: 18px; margin: 0;">Personal Information</h2>
                </div>

                <div class="row g-1">
                  <!-- ID number -->
                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                    <label for="id" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">ID Number</label>
                      <input type="text" class="form-control form-control-sm py-1" id="idnumber" name="idnumber"
                        placeholder="(E.g. xxxx-xxxx)" autofocus="autofocus" maxlength="9">
                        <span id="idnumber_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <!-- First name -->
                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                      <label for="firstname" class="form-label mb-0" style="font-weight: bold; font-size: 13px;"> Firstname</label>
                      <input type="text" class="form-control form-control-sm py-1" id="firstname" name="firstname"
                        autofocus="autofocus" maxlength="15" >
                      <span id="firstnamee" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <!-- Middle name -->
                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                      <label for="middlename" class="form-label mb-0" style="font-weight: bold; font-size: 13px;"> M.I (optional)</label>
                      <input type="text" class="form-control form-control-sm py-1" id="middlename" name="middlename"  maxlength="1">
                      <span id="middlenamee" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <!-- last name -->
                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                      <label for="lastname" class="form-label mb-0" style="font-weight: bold; font-size: 13px;"> Lastname</label>
                      <input type="text" class="form-control form-control-sm py-1" id="lastname" name="lastname" maxlength="15">
                      <span id="lastnamee" style="color:red; font-size: 11px;"></span>
                      <span id="lastname_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>
                </div>

                <div class="row g-1">
                   <!-- suffix -->
                  <div class="col-md-3 mb-1">
                  <div class="form-outline">
                      <label for="suffix" class="form-label mb-0" style="font-weight: bold; font-size: 13px;"> Extension (optional)</label>
                      <input type="text" class="form-control form-control-sm py-1" id="suffix" name="suffix" maxlength="10">
                      <span id="suffix_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                <!-- Sex -->
                  <div class="col-md-3 mb-1">
  <div class="form-outline">
                      <label for="sex" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Sex</label>
                      <select id="sex" class="form-control form-control-sm py-1" name="sex">
                        <option value="" disabled selected>Select</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
                      <span id="sex_val" style="color: red; font-size: 11px;"></span>
  </div>
</div>

<!-- Birthday -->
                  <div class="col-md-3 mb-1 d-flex align-items-center">
  <div class="form-outline w-100">
                      <label for="birth" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Birthdate</label>
                      <input type="date" class="form-control form-control-sm py-1" name="birth" id="birthdate" placeholder="birth">
                      <span id="birthdate_val" style="color: red; font-size: 11px;"></span>
  </div>
</div>

                  <!-- Age -->
                  <div class="col-md-3 mb-1 d-flex align-items-center">
                    <div class="form-outline w-100">
                      <label for="age" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Age</label>
                      <input type="number" class="form-control form-control-sm py-1" name="age" id="age"  autocomplete="off" required readonly>
                      <span id="age_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>
                </div>

                <div class="form-title mb-1" style="margin-top: 4px;">
                  <h2 class="fw-bold" style="text-align: left; color: #000000; font-size: 18px; margin: 0;">Personal Address</h2>
                </div>

                <div class="row g-1">
                  <div class="col-md-4 mb-1">
                    <div class="form-outline">
                      <label for="street" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Purok/Street</label>
                      <input type="text" class="form-control form-control-sm py-1" id="street" name="street" maxlength="15" 
                        placeholder="Format: Purok-1, Street Name, or Street Name 1" 
                        title="Accepted formats: 'Purok-1', 'Main Street', 'Street 1', etc.">
                      <span id="street_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <div class="col-md-4 mb-1">
    <div class="form-outline">
                      <label for="barangay" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Barangay</label>
                      <input type="text" class="form-control form-control-sm py-1" id="barangay" name="barangay" maxlength="15">
                      <span id="barangay_val" style="color: red; font-size: 11px;"></span>
    </div>
</div>

                  <div class="col-md-4 mb-1">
                    <div class="form-outline">
                      <label for="municipality" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Municipality/City</label>
                      <input type="text" class="form-control form-control-sm py-1" id="municipality" name="municipality" maxlength="20">
                      <span id="municipality_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>
                </div>

                <div class="row g-1">
                  <div class="col-md-4 mb-1">
                    <div class="form-outline">
                      <label for="province" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Province</label>
                      <input type="text" class="form-control form-control-sm py-1" id="province" name="province" maxlength="20">
                      <span id="province_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <div class="col-md-4 mb-1">
                    <div class="form-outline">
                      <label for="country" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Country</label>
                      <input type="text" class="form-control form-control-sm py-1" id="country" name="country" maxlength="15">
                      <span id="country_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <div class="col-md-4 mb-1">
                    <div class="form-outline">
                      <label for="postal" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Zip code</label>
                      <input type="text" class="form-control form-control-sm py-1" id="postal" name="postal" maxlength="4">
                      <span id="postal_val" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>
                </div>

                <div class="form-title mb-1" style="margin-top: 4px;">
                  <h2 class="fw-bold" style="text-align: left; color: #000000; font-size: 18px; margin: 0;">Personal Account</h2>
                </div>

                <div class="row g-1">
                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                      <label for="email" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Email</label>
                      <input type="email" class="form-control form-control-sm py-1" id="email" name="email" maxlength="30">
                      <span id="email_val" style="color:red; font-size: 11px;"></span>
                      <span id="email_vall" style="color:red; font-size: 11px;"></span>
                      <span id="email_valll" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                      <label for="username" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Username</label>
                      <input type="text" class="form-control form-control-sm py-1" id="username" name="username" maxlength="15">
                      <span id="username_val" style="color:red; font-size: 11px;"></span>
                      <span id="username_vall" style="color:red; font-size: 11px;"></span>
                      <span id="username_valll" style="color:red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                      <label id="password-label" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Password</label>
                      <div class="input-group">
                        <input type="password" class="form-control form-control-sm py-1" id="passw" name="passw" maxlength="15">
                        <div class="input-group-append">
                          <button class="btn btn-outline-secondary btn-sm" type="button" id="togglePassword" style="height: 31px; display: flex; align-items: center;">
                            <i class="fas fa-eye" id="togglePasswordIcon"></i>
                          </button>
                        </div>
                      </div>
                      <span id="password-strength" style="font-size: 11px;"></span>
                      <span id="password-req" style="font-size: 11px;"></span>
                      <span id="is-valid-password" style="color: red; font-size: 11px;"></span>
                    </div>
                  </div>

                  <div class="col-md-3 mb-1">
                    <div class="form-outline">
                      <label id="confirmpassword-label" class="form-label mb-0" style="font-weight: bold; font-size: 13px;">Confirm Password</label>
                      <div class="input-group">
                        <input type="password" class="form-control form-control-sm py-1" id="cpassword" name="cpassword" minlength="8" maxlength="20">
                        <div class="input-group-append">
                          <button class="btn btn-outline-secondary btn-sm" type="button" id="toggleConfirmPassword" style="height: 31px; display: flex; align-items: center;">
                            <i class="fas fa-eye" id="toggleConfirmPasswordIcon"></i>
                          </button>
                        </div>
                      </div>
                      <span id="is-valid-confirmpassword" style="color: red; font-size: 11px;"></span>
                    </div>
                  </div>
                </div>

                <button class="button-reg btn btn-primary btn-block btn-sm mt-2 py-1" type="submit" name="submit" style="font-size: 13px;">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="text-center p-3 mt-5" style="background-color: rgba(19, 17, 17, 0.81); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; backdrop-filter: blur(3px); border: 2px solid rgba(0, 0, 0, 0.1); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <p class="mb-1" style="font-size: 16px; margin: 0; color:white; display: flex; align-items: center; justify-content: center;">
      <img src="../IMAGES/logo.png" style="height: 24px; margin-right: 8px;">
  <strong>Benz Sneakers Online Shop</strong>. All Rights Reserved © 2024.
  </p>
    <p style="font-size: 14px; margin: 3px 0; color: #000;">
    <a href="#" style="color: white; text-decoration: none;">Privacy Policy</a> | 
    <a href="#" style="color: white; text-decoration: none;">Terms of Service</a>
  </p>
</footer>

<!-- Load scripts in correct order -->
<script src="../php/script.php?dir=js&file=jquery-3.6.0.min.js"></script>
<script src="../php/script.php?dir=js&file=Val.js"></script>
<script src="../php/script.php?dir=js&file=emailcheck.js"></script>
<script src="../php/script.php?dir=js&file=idnumbercheck.js"></script>
<script src="../php/script.php?dir=js&file=usernamecheck.js"></script>
<script src="../php/script.php?dir=js&file=passwordcheck.js"></script>
<script src="../php/script.php?dir=js&file=register.js"></script>
</body>

</html>