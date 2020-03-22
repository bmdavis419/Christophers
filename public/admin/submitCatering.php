<?php
// MENU
session_start();
// read everything from the previous page and add it to the database
if (isset($_POST["add"]) && isset($_SESSION['valid']) && ($_SESSION['valid'] = true)) {
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
    $cost = filter_var($_POST["cost"], FILTER_SANITIZE_STRING);
    $category = filter_var($_POST["type"], FILTER_SANITIZE_STRING);
    $subcategory = filter_var($_POST["subcategory"], FILTER_SANITIZE_STRING);

    // create query and run
    $stmt = $conn->prepare("INSERT INTO cateringitems (name, description, category, price, subcategory) VALUES (:n, :d, :c, :p, :s)");
    $stmt->bindParam('n', $name);
    $stmt->bindParam('d', $description);
    $stmt->bindParam('c', $category);
    $stmt->bindParam('p', $cost);
    $stmt->bindParam('s', $subcategory);
    if ($stmt->execute()) {
        // send back to previous page
        header("Location: cateringadd.php?additionsuccess");
    } else {
        header("Location: cateringadd.php?therewasanerrorwithyourdata");
    }
} else {
    header("Location: cateringadd.php?additionfailure");
}
?>