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
$features = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Features") {
		array_push($features, $allMenuItems[$i]);
	}
}
?>
<script type="text/javascript"> // the javascript needs to be on this page but all the styles already exist
// get data from php
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
display();
});
// function to display out all of the subcategories
function display() {
    // display the classic featuress
    for (var i = 0; i < features.length; i++) {
        if (features[i]["subcategory"] == "Breakfast") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#breakfastapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        } else if (features[i]["subcategory"] == "Lunch") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#lunchapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        } else if (features[i]["subcategory"] == "Dinner") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#dinnerapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        } else if (features[i]["subcategory"] == "Cabbage Roll Monday") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#cabbageapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        } else if (features[i]["subcategory"] == "Vegan Wednesday") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#veganapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        } else if (features[i]["subcategory"] == "Feature Four Thursday") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#fourapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        } else if (features[i]["subcategory"] == "Fresh Catch") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#freshapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        } else if (features[i]["subcategory"] == "Other") {
            var imagelink = "../../private/images/menu/" + features[i]["image"];
            $("#otherapp").append("<a href='../checkout.php?name=" + features[i]["name"] + "&category=" + features[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + imagelink + ");'><div class='hero-text'><p>" + features[i]["name"] + "</p></div><div class='hero-desc'><p>" + features[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
<div class="menuPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Breakfast</h3>
        <div id="breakfastapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Lunch</h3>
        <div id="lunchapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Dinner</h3>
        <div id="dinnerapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Cabbage Roll Monday</h3>
        <div id="cabbageapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Vegan Wednesday</h3>
        <div id="veganapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Feature Four Thursday</h3>
        <div id="fourapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Fresh Catch</h3>
        <div id="freshapp"></div>
    </div><hr>
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Other</h3>
        <div id="otherapp"></div>
    </div><hr>
    </div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>