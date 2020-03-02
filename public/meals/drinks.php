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
$drink = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Drinks") {
		array_push($drink, $allMenuItems[$i]);
	}
}
?>
<script type="text/javascript"> // the javascript needs to be on this page but all the styles already exist
// get data from php
var drink = <?php echo json_encode($drink); ?>;

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
    // display the classic drinks
    for (var i = 0; i < drink.length; i++) {
        if (drink[i]["subcategory"] == "Craft Beer") {
            var imagelink = "../../private/images/menu/" + drink[i]["image"];
            $("#craftapp").append("<a href='../checkout.php?name=" + drink[i]["name"] + "&category=" + drink[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + drink[i]["name"] + "</p></div><div class='hero-desc'><p>" + drink[i]["description"] +  "</p></div></a>");
        } else if (drink[i]["subcategory"] == "Wine") {
            var imagelink = "../../private/images/menu/" + drink[i]["image"];
            $("#wineapp").append("<a href='../checkout.php?name=" + drink[i]["name"] + "&category=" + drink[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + drink[i]["name"] + "</p></div><div class='hero-desc'><p>" + drink[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
<div class="menuPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Craft Beer</h3>
        <div id="craftapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Wine</h3>
        <div id="wineapp"></div>
    </div><hr>
</div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>