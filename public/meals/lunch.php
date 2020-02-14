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
$lunch = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Lunch") {
		array_push($lunch, $allMenuItems[$i]);
	}
}
?>
<script type="text/javascript"> // the javascript needs to be on this page but all the styles already exist
// get data from php
var lunch = <?php echo json_encode($lunch); ?>;

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
    // display the classic lunchs
    for (var i = 0; i < lunch.length; i++) {
        if (lunch[i]["subcategory"] == "Sandwiches") {
            var imagelink = "../../private/images/menu/" + lunch[i]["image"];
            $("#sandwichapp").append("<a href='../checkout.php?name=" + lunch[i]["name"] + "&category=" + lunch[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + lunch[i]["name"] + "</p></div><div class='hero-desc'><p>" + lunch[i]["description"] +  "</p></div></a>");
        } else if (lunch[i]["subcategory"] == "Salads") {
            var imagelink = "../../private/images/menu/" + lunch[i]["image"];
            $("#saladsapp").append("<a href='../checkout.php?name=" + lunch[i]["name"] + "&category=" + lunch[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + lunch[i]["name"] + "</p></div><div class='hero-desc'><p>" + lunch[i]["description"] +  "</p></div></a>");
        } else if (lunch[i]["subcategory"] == "Soups") {
            var imagelink = "../../private/images/menu/" + lunch[i]["image"];
            $("#soupsapp").append("<a href='../checkout.php?name=" + lunch[i]["name"] + "&category=" + lunch[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + lunch[i]["name"] + "</p></div><div class='hero-desc'><p>" + lunch[i]["description"] +  "</p></div></a>");
        } else if (lunch[i]["subcategory"] == "Grilled Naan Sandwiches") {
            var imagelink = "../../private/images/menu/" + lunch[i]["image"];
            $("#naanapp").append("<a href='../checkout.php?name=" + lunch[i]["name"] + "&category=" + lunch[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + lunch[i]["name"] + "</p></div><div class='hero-desc'><p>" + lunch[i]["description"] +  "</p></div></a>");
        } else if (lunch[i]["subcategory"] == "From The Grill") {
            var imagelink = "../../private/images/menu/" + lunch[i]["image"];
            $("#grillapp").append("<a href='../checkout.php?name=" + lunch[i]["name"] + "&category=" + lunch[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + lunch[i]["name"] + "</p></div><div class='hero-desc'><p>" + lunch[i]["description"] +  "</p></div></a>");
        } else if (lunch[i]["subcategory"] == "All Day Meals") {
            var imagelink = "../../private/images/menu/" + lunch[i]["image"];
            $("#alldayapp").append("<a href='../checkout.php?name=" + lunch[i]["name"] + "&category=" + lunch[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + lunch[i]["name"] + "</p></div><div class='hero-desc'><p>" + lunch[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Sandwiches</h3>
        <div id="sandwichapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Salads</h3>
        <div id="saladsapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Soups</h3>
        <div id="soupsapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Grilled Naan Sandwiches</h3>
        <div id="naanapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>From The Grill</h3>
        <div id="grillapp"></div>
    </div>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>All Day Meals</h3>
        <div id="alldayapp"></div>
    </div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>