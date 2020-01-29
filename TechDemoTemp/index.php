<!DOCTYPE html>
<html>
<head>
<script src="jquery-1.11.1.js"></script>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css"/>
<script type="text/javascript" src="jquery-ui-1.12.1/external/jquery/jquery.js"></script>
<script type="text/javascript" src="jquery-ui-1.12.1/jquery-ui.js"></script>
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
    });

    // function to delete item from list
    $("input[type='button']").click(function(){
        
    });
});

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

function display() {
    if (itemNames[0] != null) {
        // enable the send button
        $("#submit").removeAttr("disabled");
        $("#displaytemp").multilineText("Items in: " + propertyName + "\n");      
        // display out all of the staged items and their cost as well as a delete button
        for (var i = 0; i < itemNames.length; i++) {
            $("#displaytemp").multilineAppend("Item: " + itemNames[i] + " || Price: $" + itemCosts[i] + "   <button id='remove' type='button'>Remove</button>\n");
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
</script>
</head>
<body>
<form id="testForm" action="submit.php" method="POST">
    <div id = "displaytemp"></div><br>
    <label for="name">Property Name:</label>
    <input type="text" id="name"></input>
    <label for="item">Item name:</label>
    <input type="text" id="item"></input>
    <label for="cost">Cost:</label>
    <input type="text" id="cost"></input>
    <button id="stage" type="button">Stage</button><br>

    <label for="minimum">Minimum Selection</label>
    <input type="number" name="minimum" min="0" max="30" value="0"></input>
    <label for="maximum">Maximum Selection</label>
    <input type="number" name="maximum" min="0" max="30" value="4"></input><br>

    <input type="submit" name="add" value="Send" id="submit">
</form>
</body>
</html>