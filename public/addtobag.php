<?php
session_start();
// get all of the radio buttons and all of the possible checkboxes
$radioButtons = json_decode($_POST["radio"]);
$checkBoxes = json_decode($_POST["checkboxes"]);

// get the name and make the subtotal
$name = htmlspecialchars($_POST["name"]);
$subTotal = floatval($_POST["cost"]);

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
    array_push($itemsAdded, $split[0]);
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
        array_push($itemsAdded, $split[0]);
    }
}
echo "asdf";
?>