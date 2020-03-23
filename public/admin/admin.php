<?php 
session_start();
require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php");
// ini_set('display_errors', 'Off');
if (isset($_SESSION['valid']) && ($_SESSION['valid'] = true)){
?>
<!-- LINKS TO MENU AND PROPERTY ADDITIONS -->
<div class="adminDirectoryContainer">
<h1 class="adminLogin" >Select Which You'd Like to Create:</h1> 
<a class="adminDirectory" href="<?php echo urlfor('public/admin/menuadd.php'); ?>">Menu</a>
<a class="adminDirectory" href="<?php echo urlfor('public/admin/propertyadd.php'); ?>">Properties</a>
<a class="adminDirectory" href="<?php echo urlfor('public/admin/cateringadd.php'); ?>">Catering</a>
</div>
<script>
$("document").ready(() => {
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
	displayOrders();
});
</script>
<form action="changewait.php" method="POST">
	<?php 
	// call database
	require("../../private/functions/databaseconfig.php");
	$stmt = $conn->prepare("SELECT * FROM wait");
	$stmt->execute();
	$result = $stmt->fetchALL(PDO::FETCH_ASSOC);
	$wait = $result;

	$currentWaitTime = $wait[0]["time"];

	echo ("<label for='currentwait'>Current wait time: <input type='text' id='currentwait' name='currentwait' readonly value='" . $currentWaitTime . "'></label><br>");
	?>
	<label for="wait">Enter the current wait time in the format you want users to see (ex: 40mins): <input type="text" id="wait" name="wait"></label>
	<button type="submit">Update</button>
</form>

<?php
// get all of the orders from the permorders table
$stmt = $conn->prepare("SELECT * FROM permorders");
$stmt->execute();
$allOrders = $stmt->fetchALL(PDO::FETCH_ASSOC);
?>

<script>
// here the data from the all orders page is parsed and sorted and displayed
allOrders = <?php echo json_encode($allOrders); ?>;

// date class
class DateItem {
	constructor(inputdate, inputorders) {
		this.date = inputdate;
		this.orders = [inputorders];
	}
}

// fill the items into the date classes
var allDates = new Array();

for (var i = 0; i < allOrders.length; i++) {
	// check if there is already an item in the all dates that contains an item
	var makeNew = true;
	for (var n = 0; n < allDates.length; n++) {
		if (allDates[n].date == allOrders[i]["date"]) {
			allDates[n].orders.push(allOrders[i]);
			makeNew = false;
		}
	}
	// make a new date if there is not one for that day currently
	if (makeNew) {
		allDates.push(new DateItem(allOrders[i]["date"], allOrders[i]));
	}
}

var displayOrders = () => {
	// fill the permanent dates
	for (var i = 0; i < allDates.length; i++) {
		$("#permdates").append("<h5>" + allDates[i].date + "</h5><div><div id='" + i + "' class='newAcc'></div></div>");

		let orders = allDates[i].orders;
		// append each of the dates into the section
		for (var n = 0; n < orders.length; n++) {
			$("#" + i).append("<h5>" + orders[n]["firstname"] + " " + orders[n]["lastname"] + "|" + orders[n]["email"] + "|" + orders[n]["phone"] + "|" + orders[n]["timesent"] + "|$" + orders[n]["subtotal"] + "</h5><div id='" + i + n + "'></div>");

			// append in the orders
			// "Chicken Parmesan,Dinner,15.95,5e52903d521fd7.11120202.jpg,Side Salad Dressing: Blue Cheese,Sides: Corn,|"
			let bagItems = orders[n]["bag"];
			bagItems = bagItems.split("|");
			bagItems.pop();
			for (var c = 0; c < bagItems.length; c++) {
				let bagParts = bagItems[c].split(",");
				bagParts.pop();
				// append
				$("#" + i + n).append("<h5>" + bagParts[0] + "-" + bagParts[2] + "</h5><ul id='" + i + n + c + "'></ul>");
				for (var t = 4; t < bagParts.length; t++) {
					$("#" + i + n + c).append("<li>" + bagParts[t] + "</li>");
				}
			}
		}

		$(".innerAccordion").accordion("destroy");
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
		$(".newAcc").accordion({
			clearStyle:true,
			heightStyle:"panel",
			collapsible:true,
			active:false,
		});
	}
}
</script>

<!-- The permanent order section -->
<div id="accordionCtrl" class="outerAccordion">
		<h3>All Orders</h3>
		<div>
			<div id="permdates" class="innerAccordion">
			</div>
		</div>
	</div>
<hr>

<form action="logout.php" method="POST">
	<button type="submit" name="log">Logout</button>
</form>

<?php
} else {
	echo 'Access denied';
}
if (time() > $_SESSION['timeout'] + 1800){ // implement session regeneration functionality 
	session_regenerate_id(true);
}
include("../../private/shared/globalfooter.php"); 
?>
