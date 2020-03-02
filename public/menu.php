<?php 
require_once("../private/functions/initialize.php");
include("../private/shared/globalheader.php"); ?>
<?php
// pull down all of the menu items and sort them into the correct arrays
// call database
require("../private/functions/databaseconfig.php");
$stmt = $conn->prepare("SELECT * FROM menuitems");
$stmt->execute();
$result = $stmt->fetchALL(PDO::FETCH_ASSOC);

// fill data into the array
$allMenuItems = $result;

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
	} elseif ($allMenuItems[$i]["category"] == "Dessert") {
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
var breakfast = <?php echo json_encode($breakfast); ?>;
var lunch = <?php echo json_encode($lunch); ?>;
var dinner = <?php echo json_encode($dinner); ?>;
var drinks = <?php echo json_encode($drinks); ?>;
var dessert = <?php echo json_encode($desserts); ?>;
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
	displayDesserts();
});

// function to fill in the weekly features
function displayFeatures() {
	// loop out breakfast dishes
	for (var i = 0; i < features.length; i++) {
		if (features[i]["subcategory"] == "Breakfast") {
			$("#featuresbreakfast").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} else if (features[i]["subcategory"] == "Lunch") {
			$("#featureslunch").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} else if (features[i]["subcategory"] == "Dinner") {
			$("#featuresdinner").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} else if (features[i]["subcategory"] == "Cabbage Roll Monday") {
			$("#featurescabbagerollmonday").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} else if (features[i]["subcategory"] == "Vegan Wednesday") {
			$("#featuresvegan").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} else if (features[i]["subcategory"] == "Feature Four Thursday") {
			$("#featuresfour").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} else if (features[i]["subcategory"] == "Fresh Catch") {
			$("#featurescatch").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} else if (features[i]["subcategory"] == "Other") {
			$("#featuresother").append("<h8>" + features[i]["name"] + "</h8><p class='price'>" + features[i]["cost"] + "</p><p class='desc'>" + features[i]["description"] + "</p>");
		} 
	}
}

function displayBreakfast() {
	for (var i = 0; i < breakfast.length; i++) {
		if (breakfast[i]["subcategory"] == "Classic Breakfasts") {
			$("#breakfastsclassic").append("<h8>" + breakfast[i]["name"] + "</h8><p class='price'>" + breakfast[i]["cost"] + "</p><p class='desc'>" + breakfast[i]["description"] + "</p>");
		} else if (breakfast[i]["subcategory"] == "Omelettes") {
			$("#breakfastsomelettes").append("<h8>" + breakfast[i]["name"] + "</h8><p class='price'>" + breakfast[i]["cost"] + "</p><p class='desc'>" + breakfast[i]["description"] + "</p>");
		} else if (breakfast[i]["subcategory"] == "Frittatas") {
			$("#breakfastsfrittatas").append("<h8>" + breakfast[i]["name"] + "</h8><p class='price'>" + breakfast[i]["cost"] + "</p><p class='desc'>" + breakfast[i]["description"] + "</p>");
		} else if (breakfast[i]["subcategory"] == "Cereal") {
			$("#breakfastscereal").append("<h8>" + breakfast[i]["name"] + "</h8><p class='price'>" + breakfast[i]["cost"] + "</p><p class='desc'>" + breakfast[i]["description"] + "</p>");
		} else if (breakfast[i]["subcategory"] == "From The Griddle") {
			$("#breakfastsgriddle").append("<h8>" + breakfast[i]["name"] + "</h8><p class='price'>" + breakfast[i]["cost"] + "</p><p class='desc'>" + breakfast[i]["description"] + "</p>");
		}
	}
}

function displayLunch() {
	for (var i = 0; i < lunch.length; i++) {
		if (lunch[i]["subcategory"] == "Sandwiches") {
			$("#lunchssandwiches").append("<h8>" + lunch[i]["name"] + "</h8><p class='price'>" + lunch[i]["cost"] + "</p><p class='desc'>" + lunch[i]["description"] + "</p>");
		} else if (lunch[i]["subcategory"] == "Salads") {
			$("#lunchssalads").append("<h8>" + lunch[i]["name"] + "</h8><p class='price'>" + lunch[i]["cost"] + "</p><p class='desc'>" + lunch[i]["description"] + "</p>");
		} else if (lunch[i]["subcategory"] == "Soups") {
			$("#lunchssoups").append("<h8>" + lunch[i]["name"] + "</h8><p class='price'>" + lunch[i]["cost"] + "</p><p class='desc'>" + lunch[i]["description"] + "</p>");
		} else if (lunch[i]["subcategory"] == "Grilled Naan Sandwiches") {
			$("#lunchsnaan").append("<h8>" + lunch[i]["name"] + "</h8><p class='price'>" + lunch[i]["cost"] + "</p><p class='desc'>" + lunch[i]["description"] + "</p>");
		} else if (lunch[i]["subcategory"] == "From The Grill") {
			$("#lunchsgrill").append("<h8>" + lunch[i]["name"] + "</h8><p class='price'>" + lunch[i]["cost"] + "</p><p class='desc'>" + lunch[i]["description"] + "</p>");
		} else if (lunch[i]["subcategory"] == "All Day Meals") {
			$("#lunchsallday").append("<h8>" + lunch[i]["name"] + "</h8><p class='price'>" + lunch[i]["cost"] + "</p><p class='desc'>" + lunch[i]["description"] + "</p>");
		}
	}
}

function displayDinner() {
	for (var i = 0; i < dinner.length; i++) {
		if (dinner[i]["subcategory"] == "After 5 Menu") {
			$("#dinnersafter5").append("<h8>" + dinner[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + dinner[i]["description"] + "</p>");
		} else if (dinner[i]["subcategory"] == "Seafood") {
			$("#dinnersseafood").append("<h8>" + dinner[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + dinner[i]["description"] + "</p>");
		} else if (dinner[i]["subcategory"] == "Appetizers") {
			$("#dinnersappetizers").append("<h8>" + dinner[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + dinner[i]["description"] + "</p>");
		} else if (dinner[i]["subcategory"] == "Salads") {
			$("#dinnerssalads").append("<h8>" + dinner[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + dinner[i]["description"] + "</p>");
		} else if (dinner[i]["subcategory"] == "All Day Meals") {
			$("#dinnersallday").append("<h8>" + dinner[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + dinner[i]["description"] + "</p>");
		} else if (dinner[i]["subcategory"] == "Sandwiches") {
			$("#dinnerssandwiches").append("<h8>" + dinner[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + dinner[i]["description"] + "</p>");
		}
	}
}

function displayDrinks() {
	for (var i = 0; i < drinks.length; i++) {
		if (drinks[i]["subcategory"] == "Craft Beer") {
			$("#drinksbeer").append("<h8>" + drinks[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + drinks[i]["description"] + "</p>");
		} else if (drinks[i]["subcategory"] == "Wine") {
			$("#drinkswine").append("<h8>" + drinks[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + drinks[i]["description"] + "</p>");
		}
	}
}

function displayDesserts() {
	for (var i = 0; i < dessert.length; i++) {
		$("#dessertsdisplay").append("<h8>" + dessert[i]["name"] + "</h8><p class='price'>" + dinner[i]["cost"] + "</p><p class='desc'>" + dessert[i]["description"] + "</p>");
	}
}
</script>
<div class="menuPage">
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Weekly Features</h3>
		<div>
			<h4>Breakfast</h4>
			<div class="features" id="featuresbreakfast"></div>
			<br>
			<h4>Lunch</h4>
			<div class="features" id="featureslunch"></div>
			<br>
			<h4>Dinner</h4>
			<div class="features" id="featuresdinner"></div>
			<br>
			<h4>Cabbage Roll Monday</h4>
			<div class="features" id="featurescabbagerollmonday"></div>
			<br>
			<h4>Vegan Wednesday</h4>
			<div class="features" id="featuresvegan"></div>
			<br>
			<h4>Feature Four Thursday</h4>
			<div class="features" id="featuresfour"></div>
			<br>
			<h4>Fresh Catch</h4>
			<div class="features" id="featurescatch"></div>
			<br>
			<h4>Other</h4>
			<div class="features" id="featuresother"></div>
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
				<h5>Omelettes</h5>
				<div id="breakfastsomelettes"></div>
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
				<div id="lunchssandwiches"></div>
				<h5>Salads</h5>
				<div id="lunchssalads"></div>
				<h5>Soups</h5>
				<div id="lunchssoups"></div>
				<h5>Grilled Naan Sandwiches</h5>
				<div id="lunchsnaan"></div>
				<h5>From The Grill</h5>
				<div id="lunchsgrill"></div>
				<h5>All Day Meals</h5>
				<div id="lunchsallday"></div>
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

</div>
<?php include("../private/shared/globalfooter.php"); ?>