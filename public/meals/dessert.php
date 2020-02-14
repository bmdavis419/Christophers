<?php require_once("../../private/functions/initialize.php");
include("../../private/shared/globalheader.php");
// pull from database
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
$dessert = array();

// sort into the array
for ($i = 0; $i < count($allMenuItems); $i++) {
	if ($allMenuItems[$i]["category"] == "Dessert") {
		array_push($dessert, $allMenuItems[$i]);
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
            $("#dessertsapp").append("<a href='../checkout.php?name=" + dessert[i]["name"] + "&category=" + dessert[i]["category"] + "' class='hero-image' style='background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + imagelink + ");'><div class='hero-text'><p>" + dessert[i]["name"] + "</p></div><div class='hero-desc'><p>" + dessert[i]["description"] +  "</p></div></a>");
        }
    }
}
</script>
<div class="MealPage">
    <div id="accordionCtrl" class="outerAccordion">
        <h3>Desserts</h3>
        <div id="dessertsapp"></div>
    </div>
</div>
<?php include("../../private/shared/globalfooter.php"); ?>