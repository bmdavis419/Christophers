<?php
session_start();
if (isset($_POST["email"]) && isset($_SESSION['validk']) && ($_SESSION['validk'] = true)) {
    include("../../private/functions/databaseconfig.php");
    $email = "'" . $_POST["email"] . "'";
    $sql = "DELETE FROM orders WHERE email=$email;";
    mysqli_query($conn, $sql);
    header("Location: kitchen.php");
}
?>