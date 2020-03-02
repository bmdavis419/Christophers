<?php 
//Database Settings
$DB_HOST = "localhost";
$DB_NAME = "christophersdb";
$DB_USER = "root";
$DB_PASSWORD = "";

// PDO 
try {
    $conn = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASSWORD);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
    echo "Connection failed";
    $conn = null;
}
?>