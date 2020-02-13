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
var dessert = <?php echo json_encode($deserts); ?>;
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
	displayBreakfast();
	displayLunch();
	displayDinner();
	displayDrinks();
});

// function to fill in the weekly features
function displayFeatures() {
	// loop out breakfast dishes
	for (var i = 0; i < features.length; i++) {
		if (features[i]["subcatagory"] == "Breakfast") {
			$("#featuresbreakfast").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Lunch") {
			$("#featureslunch").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Dinner") {
			$("#featuresdinner").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Cabbage Roll Monday") {
			$("#featurescabbagerollmonday").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Vegan Wednesday") {
			$("#featuresvegan").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Feature Four Thursday") {
			$("#featuresfour").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Fresh Catch") {
			$("#featurescatch").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} else if (features[i]["subcatagory"] == "Other") {
			$("#featuresother").append("<h5>" + features[i]["name"] + "</h5><p class='desc'>" + features[i]["description"] + "</p><p class='price'>" + features[i]["cost"] + "</p>");
		} 
	}
}

function displayBreakfast() {
	for (var i = 0; i < breakfast.length; i++) {
		if (breakfast[i]["subcatagory"] == "Classic Breakfasts") {
			$("#breakfastsclassic").append("<h5>" + breakfast[i]["name"] + "</h5><p class='desc'>" + breakfast[i]["description"] + "</p><p class='price'>" + breakfast[i]["cost"] + "</p>");
		} else if (breakfast[i]["subcatagory"] == "Omlettes") {
			$("#breakfastsomlettes").append("<h5>" + breakfast[i]["name"] + "</h5><p class='desc'>" + breakfast[i]["description"] + "</p><p class='price'>" + breakfast[i]["cost"] + "</p>");
		} else if (breakfast[i]["subcatagory"] == "Frittatas") {
			$("#breakfastsfrittatas").append("<h5>" + breakfast[i]["name"] + "</h5><p class='desc'>" + breakfast[i]["description"] + "</p><p class='price'>" + breakfast[i]["cost"] + "</p>");
		} else if (breakfast[i]["subcatagory"] == "Cereal") {
			$("#breakfastscereal").append("<h5>" + breakfast[i]["name"] + "</h5><p class='desc'>" + breakfast[i]["description"] + "</p><p class='price'>" + breakfast[i]["cost"] + "</p>");
		} else if (breakfast[i]["subcatagory"] == "From The Griddle") {
			$("#breakfastsgriddle").append("<h5>" + breakfast[i]["name"] + "</h5><p class='desc'>" + breakfast[i]["description"] + "</p><p class='price'>" + breakfast[i]["cost"] + "</p>");
		}
	}
}

function displayLunch() {
	for (var i = 0; i < lunch.length; i++) {
		if (lunch[i]["subcatagory"] == "Sandwiches") {
			$("#lunchssandwiches").append("<h5>" + lunch[i]["name"] + "</h5><p class='desc'>" + lunch[i]["description"] + "</p><p class='price'>" + lunch[i]["cost"] + "</p>");
		} else if (lunch[i]["subcatagory"] == "Salads") {
			$("#lunchssalads").append("<h5>" + lunch[i]["name"] + "</h5><p class='desc'>" + lunch[i]["description"] + "</p><p class='price'>" + lunch[i]["cost"] + "</p>");
		} else if (lunch[i]["subcatagory"] == "Soups") {
			$("#lunchssoups").append("<h5>" + lunch[i]["name"] + "</h5><p class='desc'>" + lunch[i]["description"] + "</p><p class='price'>" + lunch[i]["cost"] + "</p>");
		} else if (lunch[i]["subcatagory"] == "Grilled Naan Sandwiches") {
			$("#lunchsnaan").append("<h5>" + lunch[i]["name"] + "</h5><p class='desc'>" + lunch[i]["description"] + "</p><p class='price'>" + lunch[i]["cost"] + "</p>");
		} else if (lunch[i]["subcatagory"] == "From The Grill") {
			$("#lunchsgrill").append("<h5>" + lunch[i]["name"] + "</h5><p class='desc'>" + lunch[i]["description"] + "</p><p class='price'>" + lunch[i]["cost"] + "</p>");
		} else if (lunch[i]["subcatagory"] == "All Day Meals") {
			$("#lunchsallday").append("<h5>" + lunch[i]["name"] + "</h5><p class='desc'>" + lunch[i]["description"] + "</p><p class='price'>" + lunch[i]["cost"] + "</p>");
		}
	}
}

function displayDinner() {
	for (var i = 0; i < dinner.length; i++) {
		if (dinner[i]["subcatagory"] == "After 5 Menu") {
			$("#dinnersafter5").append("<h5>" + dinner[i]["name"] + "</h5><p class='desc'>" + dinner[i]["description"] + "</p><p class='price'>" + dinner[i]["cost"] + "</p>");
		} else if (dinner[i]["subcatagory"] == "Seafood") {
			$("#dinnersseafood").append("<h5>" + dinner[i]["name"] + "</h5><p class='desc'>" + dinner[i]["description"] + "</p><p class='price'>" + dinner[i]["cost"] + "</p>");
		} else if (dinner[i]["subcatagory"] == "Appetizers") {
			$("#dinnersappetizers").append("<h5>" + dinner[i]["name"] + "</h5><p class='desc'>" + dinner[i]["description"] + "</p><p class='price'>" + dinner[i]["cost"] + "</p>");
		} else if (dinner[i]["subcatagory"] == "Salads") {
			$("#dinnerssalads").append("<h5>" + dinner[i]["name"] + "</h5><p class='desc'>" + dinner[i]["description"] + "</p><p class='price'>" + dinner[i]["cost"] + "</p>");
		} else if (dinner[i]["subcatagory"] == "All Day Meals") {
			$("#dinnersallday").append("<h5>" + dinner[i]["name"] + "</h5><p class='desc'>" + dinner[i]["description"] + "</p><p class='price'>" + dinner[i]["cost"] + "</p>");
		} else if (dinner[i]["subcatagory"] == "Sandwiches") {
			$("#dinnerssandwiches").append("<h5>" + dinner[i]["name"] + "</h5><p class='desc'>" + dinner[i]["description"] + "</p><p class='price'>" + dinner[i]["cost"] + "</p>");
		}
	}
}

function displayDrinks() {
	for (var i = 0; i < drinks.length; i++) {
		if (drinks[i]["subcatagory"] == "Craft Beer") {
			$("#drinksbeer").append("<h5>" + drinks[i]["name"] + "</h5><p class='desc'>" + drinks[i]["description"] + "</p><p class='price'>" + drinks[i]["cost"] + "</p>");
		} else if (drinks[i]["subcatagory"] == "Wine") {
			$("#drinkswine").append("<h5>" + drinks[i]["name"] + "</h5><p class='desc'>" + drinks[i]["description"] + "</p><p class='price'>" + drinks[i]["cost"] + "</p>");
		}
	}
}

function displayDesserts() {
	for (var i = 0; i < dessert.length; i++) {
		$("#dessertsdisplay").append("<h5>" + dessert[i]["name"] + "</h5><p class='desc'>" + dessert[i]["description"] + "</p><p class='price'>" + dessert[i]["cost"] + "</p>");
	}
}
</script>
<div class="menuPage">
	<div id="weeklyFeatures" class="outerAccordion">
		<h3>Weekly Features</h3>
		<div>
			<h4>Breakfast</h4>
			<div id="featuresbreakfast"></div>
			<br>
			<h4>Lunch</h4>
			<div id="featureslunch"></div>
			<br>
			<h4>Dinner</h4>
			<div id="featuresdinner"></div>
			<br>
			<h4>Cabbage Roll Monday</h4>
			<div id="featurescabbagerollmonday"></div>
			<br>
			<h4>Vegan Wednesday</h4>
			<div id="featuresvegan"></div>
			<br>
			<h4>Feature Four Thursday</h4>
			<div id="featuresfour"></div>
			<br>
			<h4>Fresh Catch</h4>
			<div id="featurescatch"></div>
			<br>
			<h4>Other</h4>
			<div id="featuresother"></div>
			<br>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Breakfast</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Classic Breakfasts</h5>
				<div id="breakfastsclassic"></div>
				<h5>Omlettes</h5>
				<div id="breakfastsomlettes"></div>
				<h5>Frittatas</h5>
				<div id="breakfastsfrittatas"></div>
				<h5>Cereal</h5>
				<div id="breakfastscereal"></div>
				<h5>From The Griddle</h5>
				<div id="breakfastsgriddle"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Lunch</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Sandwiches</h5>
				<div id="lunchessandwiches"></div>
				<h5>Salads</h5>
				<div id="lunchessalads"></div>
				<h5>Soups</h5>
				<div id="lunchessoups"></div>
				<h5>Grilled Naan Sandwiches</h5>
				<div id="lunchesnaan"></div>
				<h5>From The Grill</h5>
				<div id="lunchesgrill"></div>
				<h5>All Day Meals</h5>
				<div id="lunchesallday"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Dinner</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>After 5 Menu</h5>
				<div id="dinnersafter5"></div>
				<h5>Seafood</h5>
				<div id="dinnersseafood"></div>
				<h5>Appetizers</h5>
				<div id="dinnersappetizers"></div>
				<h5>Salads</h5>
				<div id="dinnersalads"></div>
				<h5>All Day Meals</h5>
				<div id="dinnersallday"></div>
				<h5>Sandwiches</h5>
				<div id="dinnerssandwiches"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Drinks</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Craft Beer</h5>
				<div id="drinksbeer"></div>
				<h5>Wine</h5>
				<div id="drinkswine"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Desserts</h3>
		<div id="dessertsdisplay"></div>
	</div>
<hr>
</div>
<?php include("../private/shared/globalfooter.php"); ?>