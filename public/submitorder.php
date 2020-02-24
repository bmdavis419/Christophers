<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>
<?php
session_start();
date_default_timezone_set("America/New_York");
if (isset($_POST["firstname"])) {
    // set variables with all of the data from orders page
    $firstname = "'" . $_POST["firstname"] . "'";
    $lastname = "'" . $_POST["lastname"] . "'";
    $email = "'" . $_POST["email"] . "'";
    $subtotal = "'" . $_SESSION["subtotal"] . "'";
    $bag = "'" . $_SESSION["bagstring"] . "'";
    $time = "'" . date("h:i") . "'";

    // insert into the database
    include("../private/functions/databaseconfig.php");
    $sql = "INSERT INTO orders (firstname, lastname, email, subtotal, bag, timesent) VALUES ($firstname, $lastname, $email, $subtotal, $bag, $time);";
    mysqli_query($conn, $sql);
}
session_unset();
require("../private/functions/databaseconfig.php");
$sql = "SELECT * FROM wait";
$result = mysqli_query($conn, $sql);
$wait = array();
	
// fill data into the array
if (mysqli_num_rows($result) > 0) {
	while($row = mysqli_fetch_assoc($result)) {
		$wait[] = $row;
	}
}

$currentWaitTime = $wait[0]["time"];
echo "<h1 class='adminLogin'>Thank you for ordering!<br>Your order should be ready in approximately " . $currentWaitTime . ".</h1>";
?>
<?php include("../private/shared/globalfooter.php"); ?>