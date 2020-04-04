<?php
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
    // get the deleted item
    $itemsToDelete = $_POST["menuitemdeleterdo"];

    // get image and name
    $split = explode("|", $itemsToDelete);

    // parts
    $itemToDelete = $split[0];
    $image = $split[1];

    // database
    require("../../private/functions/databaseconfig.php");
    // first delete the current value
    $stmt = $conn->prepare("DELETE FROM menuitems WHERE name=:n");
    $stmt->bindParam('n', $itemToDelete);

    // EXEC
    if ($stmt->execute()) {
        // delete the picture
        unlink("../../private/images/menu/" . $image);
        header("Location: menuadd.php?success");
    } else {
        header("Location: menuadd.php?failure");
    }
}
?>