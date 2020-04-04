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
$dessert = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Dessert") {
        if ($allMenuItems[$i]["type"] == "Out" || $allMenuItems[$i]["type"] == "Both" || $allMenuItems[$i]["type"] == "") {
            array_push($dessert, $allMenuItems[$i]);
        }
	}
}
?>
<script type="text/javascript"> // the javascript needs to be on this page but all the styles already exist
// get data from php
var dessert = <?php echo json_encode($dessert); ?>;

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
    // display the classic desserts
    for (var i = 0; i < dessert.length; i++) {
        if (dessert[i]["category"] == "Dessert") {
            var imagelink = "../../private/images/menu/" + dessert[i]["image"];
            $("#dessertsapp").append("<a href='../checkout.php?name=" + dessert[i]["name"] + "&category=" + dessert[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + dessert[i]["name"] + "</p></div><div class='hero-desc'><p>" + dessert[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
<div class="menuPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Desserts</h3>
        <div id="dessertsapp"></div>
    </div><hr>
    </div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>