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
$dinner = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Dinner") {
        if ($allMenuItems[$i]["type"] == "Out" || $allMenuItems[$i]["type"] == "Both" || $allMenuItems[$i]["type"] == "") {
            array_push($dinner, $allMenuItems[$i]);
        }
	} else  if ($allMenuItems[$i]["category"] == "Features" && $allMenuItems[$i]["subcategory"] == "Dinner") {
        if ($allMenuItems[$i]["type"] == "Out" || $allMenuItems[$i]["type"] == "Both" || $allMenuItems[$i]["type"] == "") {
            array_push($dinner, $allMenuItems[$i]);
        }   
    }
}
?>
<script type="text/javascript"> // the javascript needs to be on this page but all the styles already exist
// get data from php
var dinner = <?php echo json_encode($dinner); ?>;

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
    // display the classic dinners
    for (var i = 0; i < dinner.length; i++) {
        if (dinner[i]["subcategory"] == "After 5 Menu") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#after5app").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "&category=" + dinner[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcategory"] == "Seafood") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#seafoodapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "&category=" + dinner[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcategory"] == "Appetizers") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#app").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "&category=" + dinner[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcategory"] == "Salads") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#saladsapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "&category=" + dinner[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcategory"] == "All Day Meals") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#alldayapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "&category=" + dinner[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcategory"] == "Sandwiches") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#sandwichesapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "&category=" + dinner[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcategory"] == "Dinner") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#featuresapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "&category=" + dinner[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
<div class="menuPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Dinner Features</h3>
        <div id="featuresapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>After 5 Menu</h3>
        <div id="after5app"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Seafood</h3>
        <div id="seafoodapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Appetizers</h3>
        <div id="app"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Salads</h3>
        <div id="saladsapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>All Day Meals</h3>
        <div id="alldayapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Sandwiches</h3>
        <div id="sandwichesapp"></div>
    </div><hr>
    </div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>