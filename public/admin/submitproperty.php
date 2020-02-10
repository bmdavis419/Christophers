<?php
// add to database
if (isset($_COOKIE["property"])) {
    // enter data into database
    // call database config
    include("../../private/functions/databaseconfig.php");
    
    // get vars for the data
    $propertyname = "'" . $_COOKIE["property"] . "'";
    $propertyitems = "'" . $_COOKIE["items"] . "'";
    if (isset($_POST["selectOne"])) {
        $selectOne = 1;
    }
    else {
        $selectOne = 0;
    }

    // create query and run
    $sql = "INSERT INTO properties (name, descriptions, selectOnlyOne) VALUES ($propertyname, $propertyitems, $selectOne);";
    mysqli_query($conn, $sql);

    // confirm
    header("Location: propertyadd.php?success");
}
?>