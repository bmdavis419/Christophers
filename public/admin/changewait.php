<?php
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
    // clean the data
    function clean_value(&$value) {
        $temp = trim($value);
        $value = htmlspecialchars($temp);
    }
    array_filter($_POST, 'clean_value');

    // clean the values
    $valueToRemove = filter_var($_POST["currentwait"], FILTER_SANITIZE_STRING);
    $valueToAdd = filter_var($_POST["wait"], FILTER_SANITIZE_STRING);

    // database switch
    require("../../private/functions/databaseconfig.php");
    // first delete the current value
    $stmt = $conn->prepare("DELETE FROM wait WHERE time=:t");
    $stmt->bindParam('t', $valueToRemove);
    if ($stmt->execute()) {
        $stmtadd = $conn->prepare("INSERT INTO wait (time) VALUES (:t)");
        $stmtadd->bindParam('t', $valueToAdd);
        if ($stmtadd->execute()) {
            header("Location: admin.php?success");
        } else {
            header("Location: admin.php?error");
        }
    } else {
        header("Location: admin.php?error");
    }
}
?>