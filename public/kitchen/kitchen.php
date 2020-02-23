<?php require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php"); 
session_start();
if (isset($_SESSION['validk'])&& ($_SESSION['validk'] = true)){ ?>
<meta http-equiv="refresh" content="60"> 
<?php
// pull down all of the menu items and sort them into the correct arrays
// call database
require("../../private/functions/databaseconfig.php");
$sql = "SELECT * FROM orders";
$result = mysqli_query($conn, $sql);
$allOrders = array();

// fill data into the array
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $allOrders[] = $row;
    }
}

// echo out all of the kitchen items
foreach ($allOrders as $order) {
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
        for ($n = 3; $n < count($menuItem); $n++) {
            echo("<li>". $menuItem[$n] . "</li>");
        }
        echo ("</ul><p id='price'>" . $menuItem[1] . "</p>");
        
    }
    echo ("<form method='post' action='remove.php'><input type='hidden' name='email' id='email' value='" . $order["email"] . "'><button type='submit'>Complete order</button></form></div></div></div>");
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