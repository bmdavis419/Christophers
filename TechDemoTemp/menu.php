<!DOCTYPE html>
<html>
<head>
<script src="jquery-1.11.1.js"></script>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css"/>
<script type="text/javascript" src="jquery-ui-1.12.1/external/jquery/jquery.js"></script>
<script type="text/javascript" src="jquery-ui-1.12.1/jquery-ui.js"></script>
<?php
// pull down the properties
// create array
$allProperties = array();

// database
include("databaseconfig.php");
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
include("databaseconfig.php");
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

    // display the menu items
    displayMenuItems();
});

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

// function for creating multiline
$.fn.multilineAppend = function(text) {
    this.append(text);
    this.html(this.html().replace(/\n/g, "<br>"));
    return this;
}
$.fn.multilineText = function(text) {
    this.text(text);
    this.html(this.html().replace(/\n/g, "<br>"));
    return this;
}

// function to create a cookie
function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
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
        //$("#properties").multilineAppend("<label for='checkbox-" + i "'>" + allProperties[i]["name"] + "</label>" + "<input type='checkbox' name='checkbox-" + i +"' id='checkbox-" + i + "'>");
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
        $("#MenuDisplay").append("<img src='images/" + allMenuItems[i]["image"] + "' style='max-height: 200px; max-width: 350px;'></img><ul>");
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
<form action="submitMenu.php" method="POST" enctype="multipart/form-data">
    <h1>Menu Item Creator!</h1>
    <label for="name">Menu Item Name:</label>
    <input type="text" name="name" id="name"></input>

    <label for="description">Menu Item Description:</label>
    <textarea rows="5" cols="60" name="description" id="description">Enter desc. here...</textarea>

    <label for="cost">Menu Item Price:</label>
    <input type="number" value="0.00" min="0.00" max="2500" step="0.01" name="cost"></input>

    <!-- input an image -->
    <label for="image">Add Image:</image>
    <input type="file" name="image">
    
    <label for="type">Select the item type</label>
    <select name="type" id="type">
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Deserts</option>
        <option>Sides</option>
        <option>Drinks</option>
    </select>

    <fieldset id="properties"></fieldset>

    <input type="submit" name="add" value="Send" id="submit">
</form>

<!-- Section to display all of the added menu items -->
<div id="MenuDisplay"></div>
</body>
</html>