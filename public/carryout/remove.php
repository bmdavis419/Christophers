<?php
session_start();
if (isset($_POST["email"]) && isset($_SESSION['validk']) && ($_SESSION['validk'] = true)) {
    include("../../private/functions/databaseconfig.php");
    $email = $_POST["email"];
    $stmt = $conn->prepare("DELETE FROM orders WHERE email=:e");
    $stmt->bindParam('e', $email);
    if ($stmt->execute()) {
        header("Location: kitchen.php?success");
    } else {
        header("Location: kitchen.php?error");
    }
}
?>