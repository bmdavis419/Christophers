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
    $bag = "'" . $_POST["bagItems"] . "'";
    $time = "'" . date("h:i") . "'";

    // insert into the database
    include("../private/functions/databaseconfig.php");
    $sql = "INSERT INTO orders (firstname, lastname, email, subtotal, bag, timesent) VALUES ($firstname, $lastname, $email, $subtotal, $bag, $time);";
    mysqli_query($conn, $sql);
}
session_unset();
echo "Thank you for ordering!";
?>
<?php include("../private/shared/globalfooter.php"); ?>