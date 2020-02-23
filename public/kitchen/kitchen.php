<?php require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php"); ?>


<?php
// pull down all of the menu items and sort them into the correct arrays
// call database
require("../../private/functions/databaseconfig.php");
$sql = "SELECT * FROM menuitems";
$result = mysqli_query($conn, $sql);
$allMenuItems = array();

// fill data into the array
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $allMenuItems[] = $row;
    }
}

// sort into each section

// initialize the arrays
$breakfast = array();
$lunch = array();
$desserts = array();
$drinks = array();
$dinner = array();
$features = array();

// loop through all menu items and sort them into the right array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Breakfast") {
		array_push($breakfast, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Lunch") {
		array_push($lunch, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Dinner") {
		array_push($dinner, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Desert") {
		array_push($desserts, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Drinks") {
		array_push($drinks, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Features") {
		array_push($features, $allMenuItems[$i]);
	}
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
<div class="kitchenContent">
    <!--Repeat for each order-->
	        <div id="accordionCtrl" class="kitchenAccordion">
                <h3>INSERT FIRST_NAME LAST_NAME TIME EMAIL</h3>
             
        <div class="kitchenInner">
             <!--Repeat for each item in order -->
        <h5 class='kitchenItem'>ITEM NAME</h5></p><p id='selectedOptions'>
            <ul>
                <li>SELECTED ATTRIBUTES</li>
        </ul>   
            <!--Repeat for each item in order -->
        <h5 class='kitchenItem'>ITEM NAME</h5></p><p id='selectedOptions'>
            <ul>
                <li>SELECTED ATTRIBUTES</li>
        </ul>
        <!--Only once per order -->
        <p id="price">$PRICE</p>
        <form>
        <button>Complete Order</button>
</form>
        </div>
    </div>
</div>
</body>
</html>
<!-- includes: firstname, lastname, email, all items ordered, time ordered -->