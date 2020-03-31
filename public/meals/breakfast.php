<?php require_once("../../private/functions/initialize.php");
include("../../private/shared/globalheader.php");

// pull down all of the menu items and sort them into the correct arrays
// call database
require("../../private/functions/databaseconfig.php");
$stmt = $conn->prepare("SELECT * FROM menuitems");
$stmt->execute();
$result = $stmt->fetchALL(PDO::FETCH_ASSOC);

// fill data into the array
$allMenuItems = $result;

// initialize the array
$breakfast = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Breakfast") {
		array_push($breakfast, $allMenuItems[$i]);
	} else  if ($allMenuItems[$i]["category"] == "Features" && $allMenuItems[$i]["subcategory"] == "Breakfast") {
        array_push($breakfast, $allMenuItems[$i]);
    }
}
?>
<script type="text/javascript"> // the javascript needs to be on this page but all the styles already exist
// get data from php
var breakfast = <?php echo json_encode($breakfast); ?>;

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

display();
});

// function to display out all of the subcategories
function display() {
    // display the classic breakfasts
    for (var i = 0; i < breakfast.length; i++) {
        if (breakfast[i]["subcategory"] == "Classic Breakfasts") {
            var imagelink = "../../private/images/menu/" + breakfast[i]["image"];
            $("#classicbreakfastsapp").append("<a href='../checkout.php?name=" + breakfast[i]["name"] + "&category=" + breakfast[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + imagelink + ");'><div class='hero-text'><p>" + breakfast[i]["name"] + "</p></div><div class='hero-desc'><p>" + breakfast[i]["description"] +  "</p></div></a>");
        } else if (breakfast[i]["subcategory"] == "Omelettes") {
            var imagelink = "../../private/images/menu/" + breakfast[i]["image"];
            $("#omelettesapp").append("<a href='../checkout.php?name=" + breakfast[i]["name"] + "&category=" + breakfast[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + breakfast[i]["name"] + "</p></div><div class='hero-desc'><p>" + breakfast[i]["description"] +  "</p></div></a>");
        } else if (breakfast[i]["subcategory"] == "Frittatas") {
            var imagelink = "../../private/images/menu/" + breakfast[i]["image"];
            $("#frittatasapp").append("<a href='../checkout.php?name=" + breakfast[i]["name"] + "&category=" + breakfast[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + breakfast[i]["name"] + "</p></div><div class='hero-desc'><p>" + breakfast[i]["description"] +  "</p></div></a>");
        } else if (breakfast[i]["subcategory"] == "Cereal") {
            var imagelink = "../../private/images/menu/" + breakfast[i]["image"];
            $("#cerealapp").append("<a href='../checkout.php?name=" + breakfast[i]["name"] + "&category=" + breakfast[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + breakfast[i]["name"] + "</p></div><div class='hero-desc'><p>" + breakfast[i]["description"] +  "</p></div></a>");
        } else if (breakfast[i]["subcategory"] == "From The Griddle") {
            var imagelink = "../../private/images/menu/" + breakfast[i]["image"];
            $("#griddleapp").append("<a href='../checkout.php?name=" + breakfast[i]["name"] + "&category=" + breakfast[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + breakfast[i]["name"] + "</p></div><div class='hero-desc'><p>" + breakfast[i]["description"] +  "</p></div></a>");
        } else if (breakfast[i]["subcategory"] == "Breakfast") {
            var imagelink = "../../private/images/menu/" + breakfast[i]["image"];
            $("#featuresapp").append("<a href='../checkout.php?name=" + breakfast[i]["name"] + "&category=" + breakfast[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + breakfast[i]["name"] + "</p></div><div class='hero-desc'><p>" + breakfast[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
    <div class="menuPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Breakfast Features</h3>
        <div id="featuresapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Classic Breakfasts</h3>
        <div id="classicbreakfastsapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Omelettes</h3>
        <div id="omelettesapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Frittatas</h3>
        <div id="frittatasapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Cereal</h3>
        <div id="cerealapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>From The Griddle</h3>
        <div id="griddleapp"></div>
    </div>
</div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>