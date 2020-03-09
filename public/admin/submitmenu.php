<?php
// MENU
// read everything from the previous page and add it to the database
if (isset($_POST["add"]) && isset($_SESSION['valid']) && ($_SESSION['valid'] = true)) {
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
                $image = $fileNameNew;
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

    // CLEAN POST
    function clean_value(&$value) {
        $temp = trim($value);
        $value = htmlspecialchars($temp);
    }
    array_filter($_POST, 'clean_value');

    // set vars
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $description = filter_var($_POST["description"], FILTER_SANITIZE_STRING);
    $cost = $_POST["cost"];
    $properties = "'" . $_COOKIE["SelectedProperties"] . "'";
    $category = filter_var($_POST["type"], FILTER_SANITIZE_STRING);
    $subcategory = filter_var($_POST["subcategory"], FILTER_SANITIZE_STRING);

    // create query and run
    $stmt = $conn->prepare("INSERT INTO menuitems (name, description, category, properties, cost, image, subcategory) VALUES (:n, :d, :c, :p, :cs, :i, :s)");
    $stmt->bindParam('n', $name);
    $stmt->bindParam('d', $description);
    $stmt->bindParam('c', $category);
    $stmt->bindParam('p', $properties);
    $stmt->bindParam('cs', $cost);
    $stmt->bindParam('i', $image);
    $stmt->bindParam('s', $subcategory);
    if ($stmt->execute()) {
        // send back to previous page
        header("Location: menuadd.php?additionsuccess");
    } else {
        header("Location: menuadd.php?therewasanerrorwithyourdata");
    }
} else {
    header("Location: menuadd.php?additionfailure");
}
?>