<?php
// add to database
session_start();
if (isset($_COOKIE["property"]) && isset($_SESSION['valid']) && ($_SESSION['valid'] = true)) {
    // enter data into database
    // call database config
    include("../../private/functions/databaseconfig.php");
    
    // get vars for the data
    $propertyname = $_COOKIE["property"];
    $propertyitems = $_COOKIE["items"];
    if (isset($_POST["selectOne"])) {
        $selectOne = 1;
    }
    else {
        $selectOne = 0;
    }

    // create query and run
    $stmt = $conn->prepare("INSERT INTO properties (name, descriptions, selectOnlyOne) VALUES (:n, :i, :s)");
    $stmt->bindParam('n', $propertyname);
    $stmt->bindParam('i', $propertyitems);
    $stmt->bindParam('s', $selectOne);
    $sql = "INSERT INTO properties (name, descriptions, selectOnlyOne) VALUES ($propertyname, $propertyitems, $selectOne);";
    mysqli_query($conn, $sql);

    // confirm
    if ($stmt->execute()) {
        header("Location: propertyadd.php?success");
    }
}
?>