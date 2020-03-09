<?php
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
    // get the deleted item
    $itemToDelete = $_POST["menuitemdeleterdo"];

    // database
    require("../../private/functions/databaseconfig.php");
    // first delete the current value
    $stmt = $conn->prepare("DELETE FROM menuitems WHERE name=:n");
    $stmt->bindParam('n', $itemToDelete);

    // EXEC
    if ($stmt->execute()) {
        header("Location: menuadd.php?success");
    } else {
        header("Location: menuadd.php?failure");
    }
}
?>