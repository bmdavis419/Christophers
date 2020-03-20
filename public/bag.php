<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>
<?php session_start(); ?>

<!--This page will be populated directly from the checkout page if it is clicked -->
<?php
// "Steak,22.99,5e470b3665b554.32533391.jpg,Steak Sauce: No,Side Salad Dressing: Caesar,Side Salad Dressing: Blue Cheese,"
// echo out the items in the bag
// check if the session is set
$subtotal = 0;
$bagItems = "";
if (isset($_SESSION["bag"])) {
    $bagItems = $_SESSION["bag"];
    $subtotal = 0;
    $bagString = "";
    for ($i = 0; $i < count($bagItems); $i++) {
        // split the bag item string
        $itemDetails = explode(",", $bagItems[$i]);
        array_pop($itemDetails);
    
        // add the price to the subtotal
        $subtotal += floatval($itemDetails[1]);

        // create the item
        echo("<div class='checkoutImgWrapper'><img class='checkout-image' src='../private/images/menu/" . $itemDetails[2] . "'></img></div>");
        echo("<div class='checkoutDesc'><h5 class='checkout'>" . $itemDetails[0] . "</h5><p id='price'>$" . $itemDetails[1] . "</p><p id='selectedOptions'><ul>");
        // get all of the properties added
        for ($n = 3; $n < count($itemDetails); $n++) {
            echo("<li>" . $itemDetails[$n] . "</li>");
        }
        echo("</ul></p></div><hr>");
    }
    // create the string of  bag items
    for ($i = 0;  $i < count($bagItems); $i++) {
        $bagString = $bagString . $bagItems[$i] . "|";
    }
    $_SESSION["subtotal"] = $subtotal;
    $_SESSION["bagstring"] = $bagString;
} else {
    echo '<style type="text/css">
        .bagtoOrder {
            margin-top:15%;
        }
        </style>';
}
?>
<div class="bagtoOrder">
<h1>Return to the order page to put more food in your bag.</h1>
<button><a href="<?php echo urlfor("public/order.php"); ?>">To Order Page</a></button>
<h1>Or checkout below.</h1>
<hr>
</div>
<script>
// display the subtotal
$("document").ready(function() {
    // display in the subtotal
    $("#subtotal").val(<?php echo($subtotal); ?>);
});
</script>
<form method="POST" action="submitorder.php">
    <label for="firstname">First Name:<input type="text" id="firstname" name="firstname" required></input></label>
    <label for="lastname">Last Name:<input type="text" id="lastname" name="lastname" required></input></label>
    <label for="email">Email:<input type="email" id="email" name="email" required></input></label>
    <label for="phone">Phone Number:<input type="tel" id="tel" name="tel" required></input><label>
    <label for="subtotal">Subtotal:<input type="text" id="subtotal" name="subtotal" readonly></input></label>
    <input type="hidden" id="bagItems" name="bagItems">
    <button type="submit">Place Order</button>
</form>
<hr>
<form method="POST" action="clearbag.php">
    <button type="submit">Clear Bag</button>
</form>
<?php include("../private/shared/globalfooter.php"); ?>
