<?php 
require("../../private/functions/databaseconfig.php");

$valueToRemove = "'" . $_POST["currentwait"] . "'";
$valueToAdd = "'" . $_POST["wait"] . "'";

// first delete the current value
$sql = "DELETE FROM wait WHERE time=$valueToRemove;";
mysqli_query($conn, $sql);

// add the new value
$sql = "INSERT INTO wait (time) VALUES ($valueToAdd);";
mysqli_query($conn, $sql);
header("Location: admin.php?success");
?>