<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>
<?php
session_start();
date_default_timezone_set("America/New_York");
if (isset($_POST["firstname"]) && isset($_POST["lastname"]) && isset($_POST["email"]) && isset($_POST["tel"]) && isset($_SESSION["bagstring"])) {
    // set variables with all of the data from orders page
    // trim everything in post
    function clean_value(&$value) {
        $temp = trim($value);
        $value = htmlspecialchars($temp);
    }
    array_filter($_POST, 'clean_value');

    // sanitize all of the variables
    $firstname = filter_var($_POST["firstname"], FILTER_SANITIZE_STRING);
    $lastname = filter_var($_POST["lastnagit me"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["tel"], FILTER_SANITIZE_NUMBER_INT);
    $subtotal = $_SESSION["subtotal"];
    $bag = $_SESSION["bagstring"];
    $time = date("h:i");

    // insert into the database
    include("../private/functions/databaseconfig.php");
    // create the statement
    $stmt = $conn->prepare("INSERT INTO orders (firstname, lastname, email, subtotal, bag, timesent, phone) VALUES (:f, :l, :e, :s, :b, :t, :p)");
    $stmt->bindParam('f', $firstname);
    $stmt->bindParam('l', $lastname);
    $stmt->bindParam('e', $email);
    $stmt->bindParam('s', $subtotal);
    $stmt->bindParam('b', $bag);
    $stmt->bindParam('t', $time);
    $stmt->bindParam('p', $phone);

    // create a second statement for the admin
    $permstmt = $conn->prepare("INSERT INTO permorders (firstname, lastname, email, subtotal, bag, timesent, phone) VALUES (:f, :l, :e, :s, :b, :t, :p)");
    $permstmt->bindParam('f', $firstname);
    $permstmt->bindParam('l', $lastname);
    $permstmt->bindParam('e', $email);
    $permstmt->bindParam('s', $subtotal);
    $permstmt->bindParam('b', $bag);
    $permstmt->bindParam('t', $time);
    $permstmt->bindParam('p', $phone);

    // insert
    if ($stmt->execute() && $permstmt->execute()) {
        session_unset();
        $stmt = $conn->prepare("SELECT * FROM wait");
        $stmt->execute();
        $result = $stmt->fetchALL(PDO::FETCH_ASSOC);
	
        // fill data into the array
        $wait = $result;

        $currentWaitTime = $wait[0]["time"];
        echo "<h1 class='adminLogin'>Thank you for ordering!<br>Your order should be ready in approximately " . $currentWaitTime . ".</h1>";
    } else {
        echo "<h1 class='adminLogin'>There was an error sending your order to our cooks. Please try again, and we apologize for the inconvenence.</h1>";
    }
} else {
    header("Location: bag.php?error");
}

?>
<?php include("../private/shared/globalfooter.php"); ?>