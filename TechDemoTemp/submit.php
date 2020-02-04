<!DOCTYPE html>
<html>
<head>
<script src="jquery-1.11.1.js"></script>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css"/>
<script type="text/javascript" src="jquery-ui-1.12.1/external/jquery/jquery.js"></script>
<script type="text/javascript" src="jquery-ui-1.12.1/jquery-ui.js"></script>
</head>
<body>
<?php
// add to database
if (isset($_COOKIE["property"])) {
    // enter data into database
    // call database config
    include("databaseconfig.php");
    
    // get vars for the data
    $propertyname = "'" . $_COOKIE["property"] . "'";
    $propertyitems = "'" . $_COOKIE["items"] . "'";
    if (isset($_POST["selectOne"])) {
        $selectOne = 1;
    }
    else {
        $selectOne = 0;
    }

    // create query and run
    $sql = "INSERT INTO properties (name, descriptions, selectOnlyOne) VALUES ($propertyname, $propertyitems, $selectOne);";
    mysqli_query($conn, $sql);

    // confirm
    echo "worked!";
}

// pull from database to fill arrays to pass to javascript
// create array
$allProperties = array();

// database
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
    $("#DisplayProp").multilineText("All Properties in database:\n");
    for (var i = 0; i < allProperties.length; i++) {
        // break up the string (looks like this: "item|cost,item|cost")
        var tempName = allProperties[i]["name"];
        var tempItems = allProperties[i]["descriptions"].split(",");
        $("#DisplayProp").multilineAppend("<h1>" + tempName + "</h1><ul>");

        // echo out each item
        for (var n = 0; n < tempItems.length - 1; n++) {
            $("#DisplayProp").multilineAppend("<li>" + tempItems[n] + "</li>");
        }

        // close ul and newline
        $("#DisplayProp").multilineAppend("</ul>");
    }
}

</script>
<!-- create the item with dropdowns showing the item -->
<div id="DisplayProp"></div>

</body>
</html>