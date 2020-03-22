<?php 
require_once("../private/functions/initialize.php");
include("../private/shared/cateringheader.php");  ?>
<?php
// pull down all of the menu items and sort them into the correct arrays
// call database
require("../private/functions/databaseconfig.php");
$stmt = $conn->prepare("SELECT * FROM cateringitems");
$stmt->execute();
$result = $stmt->fetchALL(PDO::FETCH_ASSOC);

// fill data into the array
$allMenuItems = $result;

// sort into each section

// initialize the arrays
$hors = array();
$entrees = array();
$breakfast = array();
$boxed = array();
$sides = array();
$desserts = array();
$picnic = array();

// loop through all menu items and sort them into the right array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Hors") {
		array_push($hors, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Entrees") {
		array_push($entrees, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Breakfast") {
		array_push($breakfast, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Boxed") {
		array_push($boxed, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Sides") {
		array_push($sides, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Desserts") {
		array_push($desserts, $allMenuItems[$i]);
    } elseif ($allMenuItems[$i]["category"] == "Picnic Time") {
		array_push($picnic, $allMenuItems[$i]);
	}
}
?>


<script type="text/javascript">
// fill arrays from php data
var hors = <?php echo json_encode($hors); ?>;
var entrees = <?php echo json_encode($entrees); ?>;
var breakfast = <?php echo json_encode($breakfast); ?>;
var boxed = <?php echo json_encode($boxed); ?>;
var sides = <?php echo json_encode($sides); ?>;
var desserts = <?php echo json_encode($desserts); ?>;
var picnic = <?php echo json_encode($picnic); ?>;

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
	displayHors();
	displayEntrees();
	displayBreakfast();
	displayBoxed();
	displaySides();
	displayDesserts();
    displayPicnic();
});

// fill data
function displayHors() {
	for (var i = 0; i < hors.length; i++) {
		if (hors[i]["subcategory"] == "Great and Cool") {
			$("#horscasual").append("<h8>" + hors[i]["name"] + "</h8><p class='price'>" + hors[i]["price"] + "</p><p class='desc'>" + hors[i]["description"] + "</p>");
		} else if (hors[i]["subcategory"] == "Great Expectations") {
			$("#horsgreat").append("<h8>" + hors[i]["name"] + "</h8><p class='price'>" + hors[i]["price"] + "</p><p class='desc'>" + hors[i]["description"] + "</p>");
		} else if (hors[i]["subcategory"] == "Hot Hors Doeuvres") {
			$("#horshot").append("<h8>" + hors[i]["name"] + "</h8><p class='price'>" + hors[i]["price"] + "</p><p class='desc'>" + hors[i]["description"] + "</p>");
		}
	}
}

function displayEntrees() {
	for (var i = 0; i < entrees.length; i++) {
		if (entrees[i]["subcategory"] == "Poultry") {
			$("#entreespoultry").append("<h8>" + entrees[i]["name"] + "</h8><p class='price'>" + entrees[i]["price"] + "</p><p class='desc'>" + entrees[i]["description"] + "</p>");
		} else if (entrees[i]["subcategory"] == "Beef and Pork") {
			$("#entreesbeef").append("<h8>" + entrees[i]["name"] + "</h8><p class='price'>" + entrees[i]["price"] + "</p><p class='desc'>" + entrees[i]["description"] + "</p>");
		} else if (entrees[i]["subcategory"] == "Pasta/Vegetarian") {
			$("#entreespasta").append("<h8>" + entrees[i]["name"] + "</h8><p class='price'>" + entrees[i]["price"] + "</p><p class='desc'>" + entrees[i]["description"] + "</p>");
		} else if (entrees[i]["subcategory"] == "Seafood") {
			$("#entreesseafood").append("<h8>" + entrees[i]["name"] + "</h8><p class='price'>" + entrees[i]["price"] + "</p><p class='desc'>" + entrees[i]["description"] + "</p>");
		} else if (entrees[i]["subcategory"] == "Action Bars") {
			$("#entreesaction").append("<h8>" + entrees[i]["name"] + "</h8><p class='price'>" + entrees[i]["price"] + "</p><p class='desc'>" + entrees[i]["description"] + "</p>");
		}
	}
}

function displayBreakfast() {
	for (var i = 0; i < breakfast.length; i++) {
		if (breakfast[i]["subcategory"] == "Rise and Shine") {
			$("#breakfastrise").append("<h8>" + breakfast[i]["name"] + "</h8><p class='price'>" + breakfast[i]["price"] + "</p><p class='desc'>" + breakfast[i]["description"] + "</p>");
		} else if (breakfast[i]["subcategory"] == "A la Carte") {
			$("#breakfasta").append("<h8>" + breakfast[i]["name"] + "</h8><p class='price'>" + breakfast[i]["price"] + "</p><p class='desc'>" + breakfast[i]["description"] + "</p>");
		}
	}
}

function displayBoxed() {
	for (var i = 0; i < boxed.length; i++) {
		if (boxed[i]["subcategory"] == "Specialty Sandwiches") {
			$("#boxedsandwiches").append("<h8>" + boxed[i]["name"] + "</h8><p class='price'>" + boxed[i]["price"] + "</p><p class='desc'>" + boxed[i]["description"] + "</p>");
		} else if (boxed[i]["subcategory"] == "Deli Boxed Lunch Buffet") {
			$("#boxeddeli").append("<h8>" + boxed[i]["name"] + "</h8><p class='price'>" + boxed[i]["price"] + "</p><p class='desc'>" + boxed[i]["description"] + "</p>");
		} else if (boxed[i]["subcategory"] == "Wraps") {
			$("#boxedwraps").append("<h8>" + boxed[i]["name"] + "</h8><p class='price'>" + boxed[i]["price"] + "</p><p class='desc'>" + boxed[i]["description"] + "</p>");
		} else if (boxed[i]["subcategory"] == "Salads") {
			$("#boxedsalads").append("<h8>" + boxed[i]["name"] + "</h8><p class='price'>" + boxed[i]["price"] + "</p><p class='desc'>" + boxed[i]["description"] + "</p>");
		} else if (boxed[i]["subcategory"] == "Side Items") {
			$("#boxedside").append("<h8>" + boxed[i]["name"] + "</h8><p class='price'>" + boxed[i]["price"] + "</p><p class='desc'>" + boxed[i]["description"] + "</p>");
		}
	}
}

function displaySides() {
	for (var i = 0; i < sides.length; i++) {
		if (sides[i]["subcategory"] == "Side Salads") {
			$("#sidessalads").append("<h8>" + sides[i]["name"] + "</h8><p class='price'>" + sides[i]["price"] + "</p><p class='desc'>" + sides[i]["description"] + "</p>");
		} else if (sides[i]["subcategory"] == "Soups") {
			$("#sidessoup").append("<h8>" + sides[i]["name"] + "</h8><p class='price'>" + sides[i]["price"] + "</p><p class='desc'>" + sides[i]["description"] + "</p>");
		} else if (sides[i]["subcategory"] == "Hot Sides") {
			$("#sideshot").append("<h8>" + sides[i]["name"] + "</h8><p class='price'>" + sides[i]["price"] + "</p><p class='desc'>" + sides[i]["description"] + "</p>");
		}
	}
}

function displayDesserts() {
	for (var i = 0; i < desserts.length; i++) {
		if (desserts[i]["subcategory"] == "Perfect Endings") {
			$("#dessertsperfect").append("<h8>" + desserts[i]["name"] + "</h8><p class='price'>" + desserts[i]["price"] + "</p><p class='desc'>" + desserts[i]["description"] + "</p>");
		} else if (desserts[i]["subcategory"] == "Whole Desserts") {
			$("#dessertswhole").append("<h8>" + desserts[i]["name"] + "</h8><p class='price'>" + desserts[i]["price"] + "</p><p class='desc'>" + desserts[i]["description"] + "</p>");
		} 
	}
}

function displayPicnic() {
	for (var i = 0; i < picnic.length; i++) {
		$("#picnicdisplay").append("<h8>" + picnic[i]["name"] + "</h8><p class='price'>" + picnic[i]["price"] + "</p><p class='desc'>" + picnic[i]["description"] + "</p>");
	}
}
</script>
<div class="menuPage">
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Hors D'oeuvres</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Casual and Cool</h5>
				<div id="horscasual"></div>
				<h5>Great Expectations</h5>
				<div id="horsgreat"></div>
				<h5>Hot Hors D'oeuvres</h5>
				<div id="horshot"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Entrees</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Poultry</h5>
				<div id="entreespoultry"></div>
				<h5>Beef and Pork</h5>
				<div id="entreesbeef"></div>
				<h5>Pasta/Vegetarian</h5>
				<div id="entreespasta"></div>
				<h5>Seafood</h5>
				<div id="entreesseafood"></div>
				<h5>Action Bars</h5>
				<div id="entreesaction"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Breakfast</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Rise and Shine</h5>
				<div id="breakfastrise"></div>
				<h5>A la Carte</h5>
				<div id="breakfasta"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Boxed Lunches</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Specialty Sandwiches</h5>
				<div id="boxedsandwiches"></div>
				<h5>Deli Boxed Lunch Buffet</h5>
				<div id="boxeddeli"></div>
                <h5>Wraps</h5>
				<div id="boxedwraps"></div>
				<h5>Salads</h5>
				<div id="boxedsalads"></div>
                <h5>Side Items</h5>
				<div id="boxedside"></div>
			</div>
		</div>
	</div>
<hr>
<div id="accordionCtrl" class="outerAccordion">
		<h3>Salads, Soups, and Sides</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Side Salads</h5>
				<div id="sidessalads"></div>
				<h5>Soups</h5>
				<div id="sidessoups"></div>
                <h5>Hot Sides</h5>
				<div id="sideshot"></div>
			</div>
		</div>
	</div>
<hr>
	<div id="accordionCtrl" class="outerAccordion">
		<h3>Picnic Time</h3>
		<div id="picnicdisplay"></div>
	</div>
<hr>
<div id="accordionCtrl" class="outerAccordion">
		<h3>Desserts</h3>
		<div>
			<div id="innerAccordionCtrl" class="innerAccordion">
				<h5>Perfect Endings</h5>
				<div id="dessertsperfect"></div>
				<h5>Whole Desserts</h5>
				<div id="dessertswhole"></div>
			</div>
		</div>
	</div>
<hr>
</div>
<?php include("../private/shared/globalfooter.php"); ?>