<?php 
require_once("../private/functions/initialize.php");
include("../private/shared/globalheader.php"); ?>
<?php
// pull down all of the menu items and sort them into the correct arrays
// call database
require("../private/functions/databaseconfig.php");
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
$deserts = array();
$drinks = array();
$dinner = array();
$features = array();

// loop through all menu items and sort them into the right array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["catagory"] == "Breakfast") {
		array_push($breakfast, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["catagory"] == "Lunch") {
		array_push($lunch, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["catagory"] == "Dinner") {
		array_push($dinner, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["catagory"] == "Desert") {
		array_push($deserts, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["catagory"] == "Drinks") {
		array_push($drinks, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["catagory"] == "Features") {
		array_push($features, $allMenuItems[$i]);
	}
}
?>


<script type="text/javascript">
// fill arrays from php data
var breakfast = <?php echo json_encode($breakfast); ?>;
var lunch = <?php echo json_encode($lunch); ?>;
var dinner = <?php echo json_encode($dinner); ?>;
var drinks = <?php echo json_encode($drinks); ?>;
var desert = <?php echo json_encode($deserts); ?>;
var features = <?php echo json_encode($features); ?>;
$("document").ready(function() {
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
	$("#weeklyFeatures").accordion({
		clearStyle:true,
		heightStyle:"panel",
		collapsible:false,
		active:false,
	});
	displayFeatures();
});

// function to fill in the weekly features
function displayFeatures() {
	// loop out breakfast dishes
	for (var i = 0; i < features.length; i++) {
		if (features[i]["subcatagory"] == "Breakfast") {
			$("#featuresbreakfast").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Lunch") {
			$("#featureslunches").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		}
	}

	for (var i = 0; i < breakfast.length; i++) {
		if (breakfast[i]["subcatagory"] == "Classic Breakfasts") {
			$("#classicbreakfasts").append("<h5>" + breakfast[i]["name"] + "</h5><p class='desc'>" + breakfast[i]["description"] + "</p><p class='price'>" + breakfast[i]["cost"] + "</p>");
		}
	}
}
</script>
<div class="menuPage">
	<div id="weeklyFeatures1" class="outerAccordion">
		<h3>Weekly Features</h3>
		<div>
			<h4>Breakfast</h4><div id="featuresbreakfast"></div>
			<br>
		</div>
		<div>
			<h4>Lunches</h4><div id="featureslunches"></div>
			<br>
		</div>
	</div>

	<div id="accordionCtrl" class="outerAccordion">
		<h3>Breakfast</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Classic Breakfasts</h5>
				<div id = "classicbreakfasts"></div>
			</div>
		</div>
	</div>
	
			<!--To add outer content copy <h3>-</div>(directly above)-->
    <!--Closes outer accordion --> 
		<hr> <!-- line between accordions -->
	<div id="accordionCtrl" class="outerAccordion"><!--Opens Outer accordion -->
        <h3>Breakfast</h3> <!--Outer Header -->
        <div><!--Identifies the content associated with outer header -->
				<div id="innerAccordionCtrl" class="innerAccordion"><!--inner accordion -->
					<h5>Inner Accordion Header</h5>   <!--Outer Header -->
					<div> <!--Identifies the content associated with inner header -->
						<h5>Name of Dish</h5>
							<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
							<p id="price">$PRICE</p>
							<br> <!--Above h5-br are all dynamic content within inner content -->
					</div> <!--closes inner content-->
					<!--To add an extra inner element copy the <h5>-</div> -->
					<!--Below are more inner accordion headers as example content -->
					<h5>Inner Accordion Header</h5>
					<div>
						<h5>Name of Dish</h5>
							<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
							<p id="price">$PRICE</p>
							<br>
					</div>
					<h5>Inner Accordion Header</h5>
					<div>
						<h5>Name of Dish</h5>
							<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
							<p id="price">$PRICE</p>
							<br>
					</div>
				</div><!--Closes inner accordion -->
		</div> <!--Closes outer content -->
			<!--To add outer content copy <h3>-</div>(directly above)-->
    </div><!--Closes outer accordion -->
		<hr> <!-- line between accordions -->
		<!--To add a copy of an outer accordion copy <div id="accordionCtrl">-<hr> -->
        </div>
<?php include("../private/shared/globalfooter.php"); ?>