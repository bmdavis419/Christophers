<?php
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
    // get the deleted item
    $itemToDelete = $_POST["Cateringitemdeleterdo"];

    // database
    require("../../private/functions/databaseconfig.php");
    // first delete the current value
    $stmt = $conn->prepare("DELETE FROM cateringitems WHERE name=:n");
    $stmt->bindParam('n', $itemToDelete);

    // EXEC
    if ($stmt->execute()) {
        header("Location: cateringadd.php?success");
    } else {
        header("Location: cateringadd.php?failure");
    }
}
?>