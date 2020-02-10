<?php
// MENU
// read everything from the previous page and add it to the database
if (isset($_POST["add"])) {
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
                $fileDestination = "../../private/images/menu/" . $fileNameNew;
                $image = "'" . $fileNameNew . "'";
                move_uploaded_file($fileTmpName, $fileDestination);
            } else {
                header("Location: menuadd.php?fileistoobig");
            }
        } else {
            header("Location: menuadd.php?imageerror");
        }
    } else {
        header("Location: menuadd.php?Unsupportedimagetype");
    }

    // call database config
    include("../../private/functions/databaseconfig.php");

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
    header("Location: menuadd.php?additionsuccess");
} else {
    header("Location: menuadd.php?additionfailure");
}
?>