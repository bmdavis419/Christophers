<!DOCTYPE html>
<html>
<head>
<script src="jquery-1.11.1.js"></script>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css"/>
<script type="text/javascript" src="jquery-ui-1.12.1/external/jquery/jquery.js"></script>
<script type="text/javascript" src="jquery-ui-1.12.1/jquery-ui.js"></script>
</head>
<body>
<?php
// read everything from the previous page and add it to the database
if (isset($_COOKIE["SelectedProperties"])) {
    // upload the image
    // set vars with the file name and properties
    $file = $_FILES['image'];
    $fileName = $_FILES['image']['name'];
    $fileTmpName = $_FILES['image']['tmp_name'];
    $fileSize = $_FILES['image']['size'];
    $fileError = $_FILES['image']['error'];
    $fileType = $_FILES['image']['type'];

    // get the file extension
    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));

    // array of which file types are allowed
    $allowed = array('jpg', 'jpeg', 'png');

    // var for adding to database
    $image = "";

    // alg for upload as well, seting var and validation
    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 1000000) {
                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                $fileDestination = "images/" . $fileNameNew;
                $image = "'" . $fileNameNew . "'";
                move_uploaded_file($fileTmpName, $fileDestination);
            } else {
                header("Location: menu.php?fileistoobig");
            }
        } else {
            header("Location: menu.php?imageerror");
        }
    } else {
        header("Location: menu.php?Unsupportedimagetype");
    }

    // call database config
    include("databaseconfig.php");

    // set vars
    $name = "'" . $_POST["name"] . "'";
    $description = "'" . $_POST["description"] . "'";
    $cost = "'" . $_POST["cost"] . "'";
    $properties = "'" . $_COOKIE["SelectedProperties"] . "'";
    $catagory = "'" . $_POST["type"] . "'";

    // create query and run
    $sql = "INSERT INTO menuitems (name, description, catagory, properties, cost, image) VALUES ($name, $description, $catagory, $properties, $cost, $image);";
    mysqli_query($conn, $sql);

    // send back to previous page
    header("Location: menu.php?additionsuccess");
} else {
    header("Location: menu.php?additionfailure");
}