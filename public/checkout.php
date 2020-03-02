<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>
<?php 
// pull down all of the menu items and sort them into the correct arrays
// call database
require("../private/functions/databaseconfig.php");
$stmt = $conn->prepare("SELECT * FROM menuitems");
$stmt->execute();
$result = $stmt->fetchALL(PDO::FETCH_ASSOC);

// fill data into the array
$allMenuItems = $result;

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
	} elseif ($allMenuItems[$i]["category"] == "Dessert") {
		array_push($desserts, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Drinks") {
		array_push($drinks, $allMenuItems[$i]);
	} elseif ($allMenuItems[$i]["category"] == "Features") {
		array_push($features, $allMenuItems[$i]);
	}
}

// pull down all of the properties and sort them into the correct arrays
$stmt = $conn->prepare("SELECT * FROM properties");
$stmt->execute();
$result = $stmt->fetchALL(PDO::FETCH_ASSOC);

// fill data into the array
$allProperties = $result;

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

// check which category it is in and then populate the menu item from there
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

// vars for checkout 
var radioButtonsSent = [];
var checkBoxesSent = [];

// display all of the properties
function displayProperties() {
    // loop through the menu item properties
    for (var i = 0; i < filledMenuItemProperties.length; i++) {
        // generate div container and title
        $("#displayOptions").append("<div class='optionHeader'><h10>" + filledMenuItemProperties[i]["name"] + "</h10></div><div class='optionList' id='list-" + i + "'></div>");

        // split the descriptions into an array
        var descriptions = filledMenuItemProperties[i]["descriptions"].split(",");

        // genertate the options 
        if (filledMenuItemProperties[i]["selectOnlyOne"] == "1") {
            // make radio buttons
            $("#list-" + i).append("<fieldset id='items-" + i + "'><legend>Select one:</legend></fieldset>");
            for (var n = 0; n < descriptions.length - 1; n++) {
                var tempDesc = descriptions[n].split("|");
                $("#items-" + i).append("<label class='checkoutLabel' for='radio-" + i + n + "'>" + tempDesc[0] + "-$" + tempDesc[1] + "<input type='radio' id='radio-" + i + n + "' name='" + filledMenuItemProperties[i]["name"] + "' value='" + tempDesc[0] + "|" + tempDesc[1] + "' required></label>");
            }
            // add the radio button to the array that will be sent
            radioButtonsSent.push(filledMenuItemProperties[i]["name"]);
        } else {
            // make checkboxes
            $("#list-" + i).append("<fieldset id='items-" + i + "'><legend>Select:</legend></fieldset>");
            for (var n = 0; n < descriptions.length - 1; n++) {
                var tempDesc = descriptions[n].split("|");
                $("#items-" + i).append("<label class='C' for='check-" + i + n + "'>" + tempDesc[0] + "-$" + tempDesc[1] + "<input type='checkbox' id='check-" + i + n + "' name='" + filledMenuItemProperties[i]["name"] + "-" + n + "' value='" + tempDesc[0] + "|" + tempDesc[1] + "'></label>");
                // add the checkbox to the list of things to be checked for
                checkBoxesSent.push(filledMenuItemProperties[i]["name"] + "-" + n);
            }
        }
    }
}

// function to set the value on the hidden inputs
function setHiddenValues() {
    $("#checkboxes").val(JSON.stringify(checkBoxesSent));
    $("#radio").val(JSON.stringify(radioButtonsSent));
    $("#name").val(menuItem["name"]);
    $("#cost").val(menuItem["cost"]);
    $("#image").val(menuItem["image"]);
}

$("document").ready(function(){
    fillTopData();
    fillDataInProperties();
    displayProperties();
    setHiddenValues();
});
</script>
<main class="checkout">
    <div class="checkoutImgWrapper">
        <img class="checkout-image" id="dishImg">
    </div>
    <div class="checkoutDesc">
                <h5 class="checkout" id="dishName">Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
                <p id="price">$PRICE</p>
                                <p id="dishDesc"class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
                                
</div>
<form method="POST" action="addtobag.php">
    <div class="checkoutOptions">
    <div id="displayOptions"></div>
    <!-- hidden option which is where data will be sent to next page -->
    <input type="hidden" id="checkboxes" name="checkboxes">
    <input type="hidden" id="radio" name="radio">
    <input type="hidden" id="image" name="image">
    <input type="hidden" id="name" name="name">
    <input type="hidden" id="cost" name="cost">

    <button type="submit" class="submit">Submit</button>
</form>
</main>
<?php include("../private/shared/globalfooter.php"); ?>
