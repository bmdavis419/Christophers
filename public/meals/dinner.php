<?php require_once("../../private/functions/initialize.php");
include("../../private/shared/globalheader.php");
require("../../private/functions/databaseconfig.php");
$sql = "SELECT * FROM menuitems";
$result = mysqli_query($conn, $sql);
$allMenuItems = array();

// fill data into the array
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $allMenuItems[] = $row;
    }
}

// initialize the array
$dinner = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["catagory"] == "Dinner") {
		array_push($dinner, $allMenuItems[$i]);
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
        if (dinner[i]["subcatagory"] == "After 5 Menu") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#after5app").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcatagory"] == "Seafood") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#seafoodapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcatagory"] == "Appetizers") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#app").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcatagory"] == "Salads") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#saladsapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcatagory"] == "All Day Meals") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#alldayapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        } else if (dinner[i]["subcatagory"] == "Sandwiches") {
            var imagelink = "../../private/images/menu/" + dinner[i]["image"];
            $("#sandwichesapp").append("<a href='../checkout.php?name=" + dinner[i]["name"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + dinner[i]["name"] + "</p></div><div class='hero-desc'><p>" + dinner[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>After 5 Menu</h3>
        <div id="after5app"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Seafood</h3>
        <div id="seafoodapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Appetizers</h3>
        <div id="app"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Salads</h3>
        <div id="saladsapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>All Day Meals</h3>
        <div id="alldayapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Sandwiches</h3>
        <div id="sandwichesapp"></div>
    </div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>