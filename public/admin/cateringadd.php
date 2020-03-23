<?php require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php");
// ini_set('display_errors', 'Off');
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
?>
<!-- Sections for adding everything in -->
<!-- Catering -->
<?php
// pull down the properties
// create array
$allProperties = array();

// database
// call database
require("../../private/functions/databaseconfig.php");

// get all of the Catering items in an array and pass it to js
$allCateringItems = array();

// call database
$stmt = $conn->prepare("SELECT * FROM cateringitems");
$stmt->execute();
$result = $stmt->fetchALL(PDO::FETCH_ASSOC);

// fill data into the array
$allCateringItems = $result;
?>
<script>
$("document").ready(function () {
    // make the selection
    $("#type").selectmenu();
    $("#subcategory").selectmenu();
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

    // change the subcategory
    $("#type").on("selectmenuchange", function() {
        displaySubCategory();
    });

    // display the Catering items
    displayCateringItems();
});

// function for setting the subcategory
function displaySubCategory() {
    // get what is currently selected

    var currentCatSelection = $("#type").val();
    $("#subcategory").prop("disabled", false);
    if (currentCatSelection == "Hors") {
        $("#subcategory").empty().append("<option>Casual and Cool</option><option>Great Expectations</option><option>Hot Hors Doeuvres</option>");
    } else if (currentCatSelection == "Entrees") {
        $("#subcategory").empty().append("<option>Poultry</option><option>Beef and Pork</option><option>Pasta/Vegetarian</option><option>Seafood</option><option>Action Bars</option>");
    } else if (currentCatSelection == "Breakfast") {
        $("#subcategory").empty().append("<option>Rise and Shine</option><option>A la Carte</option>");
    } else if (currentCatSelection == "Boxed") {
        $("#subcategory").empty().append("<option>Specialty Sandwiches</option><option>Deli Boxed Lunch Buffet</option><option>Wraps</option><option>Salads</option><option>Side Items</option>");
    } else if (currentCatSelection == "Sides") {
        $("#subcategory").empty().append("<option>Side Salads</option><option>Soups</option><option>Hot Sides</option>");
    } else if (currentCatSelection == "Desserts") {
        $("#subcategory").empty().append("<option>Perfect Endings</option><option>Whole Desserts</option>");
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

// section for displaying the Catering items
// var
var allCateringItems = <?php echo json_encode($allCateringItems); ?>;

function displayCateringItems() {
    // display
    $("#CateringDisplay").append("<h1>Catering items currently added:</h1>");
    for (var i = 0; i < allCateringItems.length; i++) {
        // echo the name
        $("#CateringDisplay").append("<div class='addedCateringItem' id='addedCateringItem"+i+"'><h3>" + allCateringItems[i]["name"] + "</h3>");
        $("#CateringDisplay div#addedCateringItem"+i).append("<ul class=" + i + ">");
        $("#CateringDisplay ul."+i).append("<li>Price: " + allCateringItems[i]["price"] + "</li>");
        $("#CateringDisplay ul."+i).append("<li>Description: " + allCateringItems[i]["description"] + "</li>");
        $("#CateringDisplay ul."+i).append("<li>Category: " + allCateringItems[i]["category"] + "</li>");
        
        // echo them for delete
        $("#deleteCatering").append("<label for='" + allCateringItems[i]["name"] + "'>" + allCateringItems[i]["name"] + "<input type='radio' name='Cateringitemdeleterdo' id='" + allCateringItems[i]["name"] +"' value='" + allCateringItems[i]["name"] + "'></label>");
    }
}
</script>
</head>
<body>
<button class="btnAdmin" ><a href="<?php echo urlfor("public/admin"); ?>">&#8592;Admin Page</a></button>
<form action="submitCatering.php" method="POST" enctype="multipart/form-data">
    <h1 class="addHeader">Catering Item Creator</h1>
    <div class="editable">
    <div class="inputs">
    <label for="name">Catering Item Name:</label>
    <input type="text" name="name" id="name"></input><br>

    <label for="description">Catering Item Description:</label><br>
    <textarea rows="5" cols="60" name="description" id="description" spellcheck="true" placeholder="Enter desc here..."></textarea><br>

    <label for="cost">Catering Item Price:</label>
    <input type="text" id="cost" name="cost"></input><br>
    </div>
    <label class="type" for="type">Select the item type:</label>
    <div id="typecombo" data-role="fieldcontain">
    <select name="type" id="type">
        <option></option>
        <option>Hors</option>
        <option>Entrees</option>
        <option>Breakfast</option>
        <option>Boxed</option>
        <option>Sides</option>
        <option>Desserts</option>
        <option>Picnic Time</option>
    </select>
    </div>

    <label for="subcategory">Select the subcategory type</label><br>
    <select name="subcategory" id="subcategory">
        <option></option>
    </select>

    <button type="submit" name="add" value="Send" id="submit">Send</button>
</div>
</form>

<form action="deletecateringitem.php" method="POST">
    <h1 class="addHeader">Remove Catering Items</h1>
    <fieldset id="deleteCatering"></fieldset>
    <button type="submit">Remove</button>
</form>

<!-- Section to display all of the added Catering items -->
<div id="CateringDisplay"></div>
<?php
} else {
	echo 'Access denied';
}
if (time() > $_SESSION['timeout'] + 1800){ // implement session regeneration functionality 
	session_regenerate_id(true);
}
include("../../private/shared/globalfooter.php"); 
?>
