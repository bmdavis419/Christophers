<?php require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php");
// ini_set('display_errors', 'Off');
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
?>
<!-- Sections for adding everything in -->
<!-- MENU -->
<?php
// pull down the properties
// create array
$allProperties = array();

// database
include("../../private/functions/databaseconfig.php");
$sql = "SELECT * FROM properties";
$result = mysqli_query($conn, $sql);

// fill data into the array
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $allProperties[] = $row;
    }
}

// get all of the menu items in an array and pass it to js
$allMenuItems = array();

// database
include("../../private/functions/databaseconfig.php");
$sql = "SELECT * FROM menuitems";
$result = mysqli_query($conn, $sql);

// fill data into the array
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $allMenuItems[] = $row;
    }
}
?>
<script>
$("document").ready(function () {
    // make the selection
    $("#type").selectmenu();
    $("#subcatagory").selectmenu();
    displayProperties();
    $("input[type='checkbox']").checkboxradio();

    // function for when the checkboxes are clicked
    $("input[type='checkbox']").click(function(){
        // get the index from the id
        var boxId = $(this).attr("id");
        var boxIdParts = boxId.split("-");
        var index = boxIdParts[1];

        // if it is checked add, if not remove
        if (this.checked) {
            addToChecked(index);
            makePropCookie();
        } else {
            removeFromChecked(index);
            makePropCookie();
        }
    }); 

    // change the subcatagory
    $("#type").on("selectmenuchange", function() {
        displaySubCatagory();
    });

    // display the menu items
    displayMenuItems();
});

// function for setting the subcatagory
function displaySubCatagory() {
    // get what is currently selected

    var currentCatSelection = $("#type").val();
    $("#subcatagory").prop("disabled", false);
    if (currentCatSelection == "Breakfast") {
        $("#subcatagory").empty().append("<option>Classic Breakfasts</option><option>Omlettes</option><option>Frittatas</option><option>Cereal</option><option>From The Griddle</option>");
    } else if (currentCatSelection == "Lunch") {
        $("#subcatagory").empty().append("<option>Sandwiches</option><option>Salads</option><option>Soups</option><option>Grilled Naan Sandwiches</option><option>From The Grill</option><option>All Day Meals</option>");
    } else if (currentCatSelection == "Dinner") {
        $("#subcatagory").empty().append("<option>After 5 Menu</option><option>Seafood</option><option>Appetizers</option><option>Salads</option><option>All Days Meals</option><option>Sandwiches</option>");
    } else if (currentCatSelection == "Drinks") {
        $("#subcatagory").empty().append("<option>Craft Beer</option><option>Wine</option>");
    } else if (currentCatSelection == "Features") {
        $("#subcatagory").empty().append("<option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Cabbage Roll Monday</option><option>Vegan Wednesday</option><option>Feature Four Thrusday</option><option>Fresh Catch</option><option>Other</option>");
    }
    
}

// function for adding a check box to the list of checked
function addToChecked(index) {
    selectedProperties.push(properties[index]);
}

// function for removeing a check box from the list of checked
function removeFromChecked(index) {
    for (var i = 0; i < selectedProperties.length; i++) {
        if (selectedProperties[i] === properties[index]) {
            selectedProperties.splice(i, 1);
        }
    }
}

// function for creating the cookie that will pass the selected properties
function makePropCookie() {
    var cookieString = "";
    for (var i = 0; i < selectedProperties.length; i++) {
        cookieString += selectedProperties[i] + ",";
    }

    // put into a cookie
    setCookie("SelectedProperties", cookieString, 1);
}

// function to create a cookie
function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";SameSite=None Secure; path=/";
}

var allProperties = <?php echo json_encode($allProperties) ?>;

// properties array to pass to the next page
var properties = [];
var selectedProperties = [];

// function to display out all of the properties
function displayProperties() {
    $("#properties").append("<legend>Properties</legend>");
    // loop through the properties
    for (var i = 0; i < allProperties.length; i++) {
        $("#properties").append('<label for="checkbox-' + (i) + '">' + allProperties[i]["name"] + '</label>' + '<input type="checkbox" name="checkbox-' + (i) + '" id="checkbox-' + (i) + '">');
        properties.push(allProperties[i]["name"]);
    }
}

// section for displaying the menu items
// var
var allMenuItems = <?php echo json_encode($allMenuItems); ?>;

function displayMenuItems() {
    // display
    $("#MenuDisplay").append("<h1>Menu items currently added:</h1>");
    for (var i = 0; i < allMenuItems.length; i++) {
        // echo the name
        $("#MenuDisplay").append("<h3>" + allMenuItems[i]["name"] + "</h3>");
        $("#MenuDisplay").append("<img src='../../private/images/menu/" + allMenuItems[i]["image"] + "' style='max-height: 200px; max-width: 350px;'></img><ul>");
        $("#MenuDisplay").append("<li>Price: $" + allMenuItems[i]["cost"] + "</li>");
        $("#MenuDisplay").append("<li>Description: " + allMenuItems[i]["description"] + "</li>");
        $("#MenuDisplay").append("<li>Catagory: " + allMenuItems[i]["catagory"] + "</li>");

        // properties
        var propertyString = allMenuItems[i]["properties"];
        var allMenuItemProperties = propertyString.split(",");
        $("#MenuDisplay").append("<li>Attached Properties:");
        for (var n = 0; n < allMenuItemProperties.length - 1; n++) {
            $("#MenuDisplay").append("<li>" + allMenuItemProperties[n] + "</li>");
        }
        $("#MenuDisplay").append("</li></ul>");
    }
}
</script>
</head>
<body>
<form action="submitmenu.php" method="POST" enctype="multipart/form-data">
    <h1 class="addHeader">Menu Item Creator</h1>
    <div class="editable">
    <label for="name">Menu Item Name:</label>
    <input type="text" name="name" id="name"></input><br>

    <label for="description">Menu Item Description:</label><br>
    <textarea rows="5" cols="60" name="description" id="description">Enter desc. here...</textarea><br>

    <label for="cost">Menu Item Price:</label>
    <input type="number" value="0.00" min="0.00" max="2500" step="0.01" name="cost"></input><br>

    <!-- input an image -->
    <label for="image">Add Image:</image>
    <input type="file" name="image"><br>
    
    <label for="type">Select the item type</label>
    <div id="typecombo" data-role="fieldcontain">
    <select name="type" id="type">
        <option></option>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Dessert</option>
        <option>Drinks</option>
        <option>Features</option>
    </select>
    </div>

    <label for="subcatagory">Select the subcatagory type</label><br>
    <select name="subcatagory" id="subcatagory">
        <option></option>
    </select>

    <fieldset id="properties"></fieldset>

    <input type="submit" name="add" value="Send" id="submit">
</div>
</form>

<!-- Section to display all of the added menu items -->
<div id="MenuDisplay"></div>
<?php
} else {
	echo 'Access denied';
}
if (time() > $_SESSION['timeout'] + 1800){ // implement session regeneration functionality 
	session_regenerate_id(true);
}
include("../../private/shared/globalfooter.php"); 
?>
