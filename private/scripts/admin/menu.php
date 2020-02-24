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

    // display the menu items
    displayMenuItems();
});

// function for setting the subcategory
function displaySubCategory() {
    // get what is currently selected
    var currentCatSelection = $("#type").val();
    // NEED TO GET ACTUAL VALUES ASFDSDAFSDFASDAFSDAF
    if (currentCatSelection == "Breakfast") {
        $("#subcategory").empty().append("<option>Classic Breakfasts</option><option>Omelettes</option><option>Frittatas</option><option>Cereal</option><option>From The Griddle</option>");
    } else if (currentCatSelection == "Lunch") {
        $("#subcategory").empty().append("<option>Sandwiches</option><option>Salads</option><option>Soups</option><option>Grilled Naan Sandwiches</option><option>From The Grill</option><option>All Day Meals</option>");
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
        $("#MenuDisplay").append("<li>Category: " + allMenuItems[i]["category"] + "</li>");

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