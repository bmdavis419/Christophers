<?php require_once("../private/functions/initialize.php");
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
});
</script>
<div class="menuPage">
	<div id="weeklyFeatures" class="outerAccordion" id="weeklyFeatures"><!--Opens Outer accordion -->
        <h3>Weekly Features - 2/3-2/10</h3> <!--The weekly features header needs to be concatenated with the date-->
        <div><!--Identifies the content associated with outer header -->
						<h4>Breakfast</h4>
							<h5>Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
								<p id="price">$PRICE</p>
							<br> <!--Above h5-br are all dynamic content within inner content -->
						<h4>Lunch</h4>
							<h5>Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
								<p id="price">$PRICE</p>
							<br>
						<h4>Dinner</h4>
							<h5>Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
								<p id="price">$PRICE</p>
							<br>
						<h4>Cabbage Roll Monday</h4>
							<h5>Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
								<p id="price">$PRICE</p>
							<br>
						<h4>Vegan Wednesday</h4>
							<h5>Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
								<p id="price">$PRICE</p>
							<br>
						<h4>Feature Four Thursday</h4>
							<h5>Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
								<p id="price">$PRICE</p>
							<br>
						<h4>Fresh Catch</h4>
							<h5>Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
								<p id="price">$PRICE</p>
							<br>
				</div><!--Closes inner accordion -->
		</div> <!--Closes outer content -->
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