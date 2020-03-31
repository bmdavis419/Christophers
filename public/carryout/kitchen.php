<?php require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php"); 
session_start();
if (isset($_SESSION['validk'])&& ($_SESSION['validk'] = true)){ ?>
<meta http-equiv="refresh" content="60"> 
<?php
// pull down all of the menu items and sort them into the correct arrays
// call database
// call database
require("../../private/functions/databaseconfig.php");
$stmt = $conn->prepare("SELECT * FROM orders");
$stmt->execute();
$result = $stmt->fetchALL(PDO::FETCH_ASSOC);
$allOrders = $result;

$incomingOrders = array();
$addedOrders = array();
$completedOrders = array();

// split into three sections 
foreach ($allOrders as $order) {
    if ($order["status"] == "incoming") {
        array_push($incomingOrders, $order);
    } else if ($order["status"] == "added") {
        array_push($addedOrders, $order);
    } else if ($order["status"] == "completed") {
        array_push($completedOrders, $order);
    }
}

// echo out all of the kitchen items
echo("<h1 class='adminLogin'>Incoming Orders:</h1>");
foreach ($incomingOrders as $order) {
    echo ("<div class='kitchenContent'><div id='accordionCtrl' class='kitchenAccordion'><h3>" . $order["firstname"] . " " . $order["lastname"] . "-" . $order["timesent"] . "-$" . $order["subtotal"] . "</h3>");
    echo ("<div class='kitchenInner'>");
    // decode the bag
    $decodedBag = $order["bag"];
    // echo out the bag
    $bagItems = explode("|", $decodedBag);
    array_pop($bagItems);
    for ($i = 0; $i < count($bagItems); $i++) {
        // split the string
        $menuItem = explode(",", $bagItems[$i]);
        array_pop($menuItem);
        echo ("<h5 class='kitchenItem'>" . $menuItem[0] . "</h5><ul>");
        for ($n = 4; $n < count($menuItem); $n++) {
            echo("<li>". $menuItem[$n] . "</li>");
        }
        echo ("</ul><p id='price'>" . $menuItem[2] . "</p>");
        
    }
    echo ("<form method='post' action='add.php'><input type='hidden' name='email' id='email' value='" . $order["email"] . "'><button type='submit'>Add Order</button></form></div></div></div>");
}

echo("<h1 class='adminLogin'>Added Orders:</h1>");
foreach ($addedOrders as $order) {
    echo ("<div class='kitchenContent'><div id='accordionCtrl' class='kitchenAccordion'><h3>" . $order["firstname"] . " " . $order["lastname"] . "-" . $order["timesent"] . "-$" . $order["subtotal"] . "</h3>");
    echo ("<div class='kitchenInner'>");
    // decode the bag
    $decodedBag = $order["bag"];
    // echo out the bag
    $bagItems = explode("|", $decodedBag);
    array_pop($bagItems);
    for ($i = 0; $i < count($bagItems); $i++) {
        // split the string
        $menuItem = explode(",", $bagItems[$i]);
        array_pop($menuItem);
        echo ("<h5 class='kitchenItem'>" . $menuItem[0] . "</h5><ul>");
        for ($n = 4; $n < count($menuItem); $n++) {
            echo("<li>". $menuItem[$n] . "</li>");
        }
        echo ("</ul><p id='price'>" . $menuItem[2] . "</p>");
        
    }
    echo ("<form method='post' action='complete.php'><input type='hidden' name='email' id='email' value='" . $order["email"] . "'><button type='submit'>Complete order</button></form></div></div></div>");
}

echo("<h1 class='adminLogin'>Completed Orders:</h1>");
foreach ($completedOrders as $order) {
    echo ("<div class='kitchenContent'><div id='accordionCtrl' class='kitchenAccordion'><h3>" . $order["firstname"] . " " . $order["lastname"] . "-" . $order["timesent"] . "-$" . $order["subtotal"] . "</h3>");
    echo ("<div class='kitchenInner'>");
    // decode the bag
    $decodedBag = $order["bag"];
    // echo out the bag
    $bagItems = explode("|", $decodedBag);
    array_pop($bagItems);
    for ($i = 0; $i < count($bagItems); $i++) {
        // split the string
        $menuItem = explode(",", $bagItems[$i]);
        array_pop($menuItem);
        echo ("<h5 class='kitchenItem'>" . $menuItem[0] . "</h5><ul>");
        for ($n = 4; $n < count($menuItem); $n++) {
            echo("<li>". $menuItem[$n] . "</li>");
        }
        echo ("</ul><p id='price'>" . $menuItem[2] . "</p>");
        
    }
    echo ("<form method='post' action='remove.php'><input type='hidden' name='email' id='email' value='" . $order["email"] . "'><button type='submit'>Delete Order CANNOT BE UNDONE</button></form></div></div></div>");
}
?>
<script type="text/javascript">
// fill arrays from php data
$("document").ready(function() {
	$(".kitchenAccordion").accordion({
		clearStyle:true,
		heightStyle:"panel",
		collapsible:true,
		active:false,	
	});
    $(".outerAccordion").accordion({
		clearStyle:true,
		heightStyle:"panel",
		collapsible:true,
		active:false,	
	});
	$(".innerAccordion").accordion({
		clearStyle:true,
		heightStyle:"panel",
		collapsible:true,
		active:false,
	});
});
</script>

</body>
</html>
<?php } else {
	echo 'Access denied';
}
if (time() > $_SESSION['timeoutk'] + 1800){ // implement session regeneration functionality 
	session_regenerate_id(true);
}
?>
<!-- includes: firstname, lastname, email, all items ordered, time ordered -->