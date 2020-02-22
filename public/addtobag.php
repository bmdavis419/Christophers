<?php
session_start();
// get all of the radio buttons and all of the possible checkboxes
$radioButtons = json_decode($_POST["radio"]);
$checkBoxes = json_decode($_POST["checkboxes"]);

// get the name and make the subtotal
$name = htmlspecialchars($_POST["name"]);
$subTotal = floatval($_POST["cost"]);
$image = $_POST["image"];

// change all of the spaces to _ in the arrays
for ($i = 0; $i < count($radioButtons); $i++) {
    $radioButtons[$i] = str_replace(' ', '_', $radioButtons[$i]);
}
for ($i = 0; $i < count($checkBoxes); $i++) {
    $checkBoxes[$i] = str_replace(' ', '_', $checkBoxes[$i]);
}

// cart desc string
$itemsAdded = array();

// add all of the radio buttons to the selected array
for ($i = 0; $i < count($radioButtons); $i++) {
    $split = $_POST[$radioButtons[$i]];
    $split = explode("|", $split);
    // add to subtotal
    $subTotal += floatval($split[1]);
    $stringToAdd = (str_replace('_', ' ', $radioButtons[$i])) . ": " . $split[0];
    array_push($itemsAdded, $stringToAdd);
}

// add all of the checkboxes to the selected array
for ($i = 0; $i < count($checkBoxes); $i++) {
    // check if the item is set
    if (isset($_POST[$checkBoxes[$i]])) {
        // split the string
        $split = $_POST[$checkBoxes[$i]];
        $split = explode("|", $split);
        // add to subtotal
        $subTotal += floatval($split[1]);
        // remove the -number from the end of the string
        $trimmedString = substr_replace($checkBoxes[$i], "", -2);
        $stringToAdd = (str_replace('_', ' ', $trimmedString)) . ": " . $split[0];
        array_push($itemsAdded, $stringToAdd);
    }
}

// make the string that will be added to the bag array
$bagString = $name . ",";
$bagString = $bagString . $subTotal . ",";
$bagString = $bagString . $image . ",";
for ($i = 0; $i < count($itemsAdded); $i++) {
    $bagString = $bagString . $itemsAdded[$i] . ",";
}

// add the menu items to the session variable
// check if the session is currently set or not
if (isset($_SESSION["bag"])) {
    // add to the bag
    array_push($_SESSION["bag"], $bagString);
} else {
    // create bag
    $_SESSION["bag"] = array();
    array_push($_SESSION["bag"], $bagString);
}

// redirect to the checkout page
header("Location: bag.php");
?>