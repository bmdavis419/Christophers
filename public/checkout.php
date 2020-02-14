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

// vars for the properties
var menuItemProperties = menuItem["properties"].split(",");
var filledMenuItemProperties = [];

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

// fill the data into the menu item properties
function fillDataInProperties() {
    for (var i = 0; i < menuItemProperties.length - 1; i++) {
        for (var n = 0; n < allProperties.length; n++) {
            if(menuItemProperties[i] == allProperties[n]["name"]) {
                filledMenuItemProperties.push(allProperties[n]);
            }
        }
    }
}

// display all of the properties
function displayProperties() {
    // loop through the menu item properties
    for (var i = 0; i < filledMenuItemProperties.length; i++) {
        // generate div container and title
        $("#displayOptions").append("<div class='optionHeader'><h6>" + filledMenuItemProperties[i]["name"] + "</h6></div><div class='optionList' id='list-" + i + "'></div>");

        // split the descriptions into an array
        var descriptions = filledMenuItemProperties[i]["descriptions"].split(",");

        // genertate the options 
        if (filledMenuItemProperties[i]["selectOnlyOne"] == "1") {
            // make radio buttons
            $("#list-" + i).append("<fieldset id='items-" + i + "'><legend>Select one:</legend></fieldset>");
            for (var n = 0; n < descriptions.length - 1; n++) {
                var tempDesc = descriptions[n].split("|");
                $("#items-" + i).append("<label for='radio-" + i + n + "'>" + tempDesc[0] + "-$" + tempDesc[1] + "<input type='radio' id='radio-" + i + n + "' name='" + filledMenuItemProperties[i]["name"] + "' value='" + tempDesc[0] + "|" + filledMenuItemProperties[i]["name"] + "'></label>");
            }
        } else {
            // make checkboxes
            $("#list-" + i).append("<fieldset id='items-" + i + "'><legend>Select:</legend></fieldset>");
            for (var n = 0; n < descriptions.length - 1; n++) {
                var tempDesc = descriptions[n].split("|");
                $("#items-" + i).append("<label for='check-" + i + n + "'>" + tempDesc[0] + "-$" + tempDesc[1] + "<input type='checkbox' id='check-" + i + n + "' name='" + filledMenuItemProperties[i]["name"] + "' value='" + tempDesc[0] + "|" + filledMenuItemProperties[i]["name"] + "'></label>");
            }
        }
    }
}

$("document").ready(function(){
    fillTopData();
    fillDataInProperties();
    displayProperties();
});
</script>
<main class="checkout">
    <div class="checkoutImgWrapper">
        <img class="checkout" id="dishImg">
    </div>
    <div class="checkoutDesc">
                <h5 class="checkout" id="dishName">Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p id="dishDesc"class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
                                <p id="price">$PRICE</p>
</div>
<hr>
<div id="displayOptions"></div>
<form method="POST" action="addtobag.php">
    <button type="submit">Submit</button>
</form>
</main>
<?php include("../private/shared/globalfooter.php"); ?>
