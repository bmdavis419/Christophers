<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>
<?php 
// pull all of the propertys and items from the database
// call database
require("../private/functions/databaseconfig.php");
$sql = "SELECT * FROM menuitems";
$result = mysqli_query($conn, $sql);
$allMenuItems = array();

// fill data into the array
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $allMenuItems[] = $row;
    }
}

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
	} elseif ($allMenuItems[$i]["category"] == "Desert") {
		array_push($desserts, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Drinks") {
		array_push($drinks, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Features") {
		array_push($features, $allMenuItems[$i]);
	}
}

// properties
$sql = "SELECT * FROM properties";
$result = mysqli_query($conn, $sql);
$allProperties = array();

// fill data into the array
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $allProperties[] = $row;
    }
}

// get the data to be sent to the jquery
$selectedCategory;
$selectedMenuItem;
$menuItem;
if (isset($_GET["category"]) && isset($_GET["name"])) {
    $selectedMenuItem = $_GET["name"];
    $selectedCategory = $_GET["category"];
} else {
    echo("ERROR");
}

// check which catagory it is in and then populate the menu item from there
if ($selectedCategory == "Breakfast") {
    for ($i = 0; $i < count($breakfast); $i++) {
        if ($breakfast[$i]["name"] == $selectedMenuItem) {
            $menuItem = $breakfast[$i];
        }
    }
} elseif ($selectedCategory == "Lunch") {
    for ($i = 0; $i < count($lunch); $i++) {
        if ($lunch[$i]["name"] == $selectedMenuItem) {
            $menuItem = $lunch[$i];
        }
    }
} elseif ($selectedCategory == "Dinner") {
    for ($i = 0; $i < count($dinner); $i++) {
        if ($dinner[$i]["name"] == $selectedMenuItem) {
            $menuItem = $dinner[$i];
        }
    }
} elseif ($selectedCategory == "Dessert") {
    for ($i = 0; $i < count($desserts); $i++) {
        if ($desserts[$i]["name"] == $selectedMenuItem) {
            $menuItem = $desserts[$i];
        }
    }
} elseif ($selectedCategory == "Drinks") {
    for ($i = 0; $i < count($drinks); $i++) {
        if ($drinks[$i]["name"] == $selectedMenuItem) {
            $menuItem = $drinks[$i];
        }
    }
} elseif ($selectedCategory == "Features") {
    for ($i = 0; $i < count($features); $i++) {
        if ($features[$i]["name"] == $selectedMenuItem) {
            $menuItem = $features[$i];
        }
    }
}
?>
<script>
// get the data from php
var allProperties = <?php echo json_encode($allProperties); ?>;
var menuItem = <?php echo json_encode($menuItem); ?>;

// function to fill in the top data
function fillTopData() {
    // menu item name
    $("#dishName").empty();
    $("#dishName").append(menuItem["name"]);

    // menu item desc
    $("#dishDesc").empty();
    $("#dishDesc").append(menuItem["description"]);

    // menu item cost
    $("#price").empty();
    $("#price").append(menuItem["cost"]);

    // menu item image
    $("#dishImg").attr("src", "<?php echo urlfor("private/images/menu/"); ?>" + menuItem["image"]);
}

$("document").ready(function(){
    fillTopData();
});
</script>
<main class="checkout">
    <div class="checkoutImgWrapper">
        <img class="checkout" id="dishImg" src="DYNAMICPLACEHOLDER">
    </div>
    <div class="checkoutDesc">
                <h5 class="checkout" id="dishName">Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p id="dishDesc"class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
                                <p id="price">$PRICE</p>
</div>
<hr>
<div class="optionHeader">
<h6>Dynamically Entered Option Possibility</h6>
</div>
<div class="optionList">
    <div class="option" onclick="classList.add('clickedOption')"><p class="optionText">Possibility 1</p></div>
    <div class="option" onclick="classList.add('clickedOption')"><p class="optionText">Possibility 2</p></div>
</div>
</main>


<?php include("../private/shared/globalfooter.php"); ?>
