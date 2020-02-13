<?php require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php");
// ini_set('display_errors', 'Off');
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
?>
<script>
// add the items to the lists of temp values
var propertyName;
var itemNames = [];
var itemCosts = [];

// current item
var currentItemIndex = 0;

// function to add items to arrays and display them in the stage
$("document").ready(function() {
    
    // by default set the send button to disabled
    $("#submit").attr("disabled", "disabled");

    $("#stage").click(function(){
        addItems();
        display();
        displayItemsForDelete();
        $("input[type='checkbox']").checkboxradio();
        $("input[type='checkbox']").click(function(){
            // get the index from the id
            var boxId = $(this).attr("id");
            var boxIdParts = boxId.split("-");
            var index = boxIdParts[1];

            // add or remove based off checked
            if (this.checked) {
                addToChecked(index);
            } else {
                removeFromChecked(index);
            }
        }); 
    });
    // function to delete item from list
    displayItemsForDelete(); 
    $("#delete").click(function() {
        deleteSelectedProperties();
    });
});

removeIndexes = [];
// function to delete the selected items
function deleteSelectedProperties() {
    // break down the current items
    for (var i = 0; i < selectedItems.length; i++) {
        for (var n = 0; n < itemNames.length; n++) {
            if (selectedItems[i] == itemNames[n]) {
                removeIndexes.push(n);
            }
        }
    }

    // delete the items from the cost and name list
    for (var i = 0; i < removeIndexes.length; i++) {
        itemNames.splice(removeIndexes[i], 1);
        itemCosts.splice(removeIndexes[i], 1);
        currentItemIndex -= 1;
    }

    // refresh the preview
    display();
    displayItemsForDelete();
    $("input[type='checkbox']").click(function(){
        // get the index from the id
        var boxId = $(this).attr("id");
        var boxIdParts = boxId.split("-");
        var index = boxIdParts[1];

        // add or remove based off checked
        if (this.checked) {
            addToChecked(index);
        } else {
            removeFromChecked(index);
        }
    }); 
}

var selectedItems = [];

// functions for staging the items to delete
function addToChecked(index) {
    selectedItems.push(itemsDelete[index]);
}

function removeFromChecked(index) {
    for (var i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i] === itemsDelete[index]) {
            selectedItems.splice(i, 1);
        }
    }
}

// function to move the items
function addItems() {
    if ($("#item").val() != "" && $("#cost").val() != "" && $("#name").val() != "") {
        itemNames[currentItemIndex] = $("#item").val();
        itemCosts[currentItemIndex] = $("#cost").val();
        if (propertyName == null) {
            propertyName = $("#name").val();
            $("#name").attr("disabled", "disabled");
        }
        currentItemIndex += 1;
    } else {
        alert("Please enter a value into all three fields");
    }
}

// function to create a cookie
function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// function to display the added items
function display() {
    if (itemNames[0] != null) {
        // enable the send button
        $("#displaytemp").empty();
        $("#submit").removeAttr("disabled");
        $("#displaytemp").append("Items in: " + propertyName + "<br>");      
        // display out all of the staged items and their cost as well as a delete button
        for (var i = 0; i < itemNames.length; i++) {
            $("#displaytemp").append("Item: " + itemNames[i] + " || Price: $" + itemCosts[i] + "<br>");
        }

        // create string to put in database
        var itemString = "";
        for (var i = 0; i < itemNames.length; i++) {
            itemString += itemNames[i] + "|" + itemCosts[i] + ",";
        }
        // create a cookie with the data in it
        setCookie("property", propertyName, 1);
        setCookie("items", itemString, 1);
    }
}

var itemsDelete = []

// function to delete the added items
function displayItemsForDelete() {
    $("#items").empty();
    $("#items").append("<legend>Select item(s) to delete:</legend>");
    itemsDelete = [];
    for (var i = 0; i < itemNames.length; i++) {
        $("#items").append('<label for="checkbox-' + (i) + '">' + itemNames[i] + '</label>' + '<input type="checkbox" name="checkbox-' + (i) + '" id="checkbox-' + (i) + '">');
        itemsDelete.push(itemNames[i]);
    }
}
</script>

<?php
// pull from database to fill arrays to pass to javascript
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
?>
<script>
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

var allProperties = <?php echo json_encode($allProperties) ?>;

// vars for display and data
$("document").ready(function () {
    displayItems();
});

// function to display data
function displayItems() {
    // echo the display
    $("#DisplayProp").append("<h7 class='addedProperties'>All Properties in database:</h7><br><br><br>");
    for (var i = 0; i < allProperties.length; i++) {
        // break up the string (looks like this: "item|cost,item|cost")
        var tempName = allProperties[i]["name"];
        var tempItems = allProperties[i]["descriptions"].split(",");
        $("#DisplayProp").append("<label for="+i+" class='addedProperty'><h1 class='addedPropertyHeader'>" + tempName + "</h1><input class='deleteProperty' type='radio' id="+i+" name="+i+" value='1'></input><br><ul class=" + i + "></ul>");
        // echo out each item
        for (var n = 0; n < tempItems.length - 1; n++) {
            $("#DisplayProp ul."+i).append("<div class='propertyItem'>" + tempItems[n] + "</div>");
        }
     
        // close ul and newline
    }
}

</script>
</head>
<body>
<form id="testForm" action="submitproperty.php" method="POST">
    <h1 class="addHeader">Property Item Creator</h1>
    <div class="editable">
    <div id = "displaytemp"></div>
    <fieldset id="items"></fieldset>
    <button class="deleteButton" id="delete" type="button">Delete</button>
    <button class="stageButton"id="stage" type="button">Stage</button>
    <button class="sendButton" type="submit" name="add" value="Send" id="submit">Send</button>

    <div class="inputs">
    <label for="name">Property Name:</label>
    <input type="text" id="name"></input>
    
    <label for="item">Item name:</label>
    <input type="text" id="item"></input>
    
    <label for="cost">Cost:</label>
    <input type="text" id="cost"></input>
    <br>
    <label for="selectOne">Select Only One:</label>
    <input type="checkbox" id="selectOne" name="selectOne" value="1"></input><br>
</div>
</div>
</form>

<div id="DisplayProp"></div>
<button class="DeleteButton" type="Delete" name="add" value="Send" id="submit">Delete</button>
<?php
} else {
	echo 'Access denied';
}
if (time() > $_SESSION['timeout'] + 1800){ // implement session regeneration functionality 
	session_regenerate_id(true);
}
include("../../private/shared/globalfooter.php"); 
?>