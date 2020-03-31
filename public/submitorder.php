<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>
<?php
session_start();
date_default_timezone_set("America/New_York");

// function to validate the order time
function validateOrder($bag) {
    // get the current time
    $time = date("H:i");
    $breakfast = "7:30";
    $lunch = "11:00";
    $dinner = "16:30";
    $close = "21:00";

    $currentTimeStamp = strtotime($time);
    $breakfastTimeStamp = strtotime($breakfast);
    $lunchTimeStamp = strtotime($lunch);
    $dinnerTimeStamp = strtotime($dinner);
    $closeTimeStamp = strtotime($close);

    // get the current range of availability
    $currentlyAvailable = array();
    if ($breakfastTimeStamp < $currentTimeStamp && $lunchTimeStamp > $currentTimeStamp) {
        $currentlyAvailable = array("Breakfast", "Dessert", "Drinks", "Features");
    } else if ($lunchTimeStamp < $currentTimeStamp && $dinnerTimeStamp > $currentTimeStamp) {
        $currentlyAvailable = array("Lunch", "Dessert", "Drinks", "Features");
    } else if ($dinnerTimeStamp < $currentTimeStamp && $closeTimeStamp > $currentTimeStamp) {
        $currentlyAvailable = array("Dinner", "Dessert", "Drinks", "Features");
    } else {
        $currentlyAvailable = ("");
    }

    // get all of the categorys selected by the user
    $bagItems = explode("|", $bag);

    // remove last item
    array_pop($bagItems);

    // list of categorys
    $categoryList = array();
    for ($i = 0; $i < count($bagItems); $i++) {
        // split the bag item and add
        $split = explode(",", $bagItems[$i]);
        array_push($categoryList, $split[1]);
    }

    $isAllowed = true;

    // compare the items in the category list
    for ($i = 0; $i < count($categoryList); $i++) {
        if (in_array($categoryList[$i], $currentlyAvailable) != true) {
            $isAllowed = false;
        }
    }
    
    // return
    return $isAllowed;
}

// "Christopher’s New York Strip,Dinner,20.95,5e528fa1748ca8.41236358.jpg,Steak Sauce: No,Sides: Corn,|"
$test = validateOrder($_SESSION["bagstring"]);


if (isset($_POST["firstname"]) && isset($_POST["lastname"]) && isset($_POST["email"]) && isset($_POST["tel"]) && isset($_SESSION["bagstring"])) {
    // validate the order
    if (validateOrder($_SESSION["bagstring"])) {
        // set variables with all of the data from orders page
    // trim everything in post
    function clean_value(&$value) {
        $temp = trim($value);
        $value = htmlspecialchars($temp);
    }
    array_filter($_POST, 'clean_value');

    // sanitize all of the variables
    $firstname = filter_var($_POST["firstname"], FILTER_SANITIZE_STRING);
    $lastname = filter_var($_POST["lastname"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($_POST["tel"], FILTER_SANITIZE_NUMBER_INT);
    $subtotal = $_SESSION["subtotal"];
    $bag = $_SESSION["bagstring"];
    $time = date("h:i");
    $date = date("Y-m-d");
    $status = "incoming";

    // insert into the database
    include("../private/functions/databaseconfig.php");
    // create the statement
    $stmt = $conn->prepare("INSERT INTO orders (firstname, lastname, email, subtotal, bag, timesent, phone, date, status) VALUES (:f, :l, :e, :s, :b, :t, :p, :d, :st)");
    $stmt->bindParam('f', $firstname);
    $stmt->bindParam('l', $lastname);
    $stmt->bindParam('e', $email);
    $stmt->bindParam('s', $subtotal);
    $stmt->bindParam('b', $bag);
    $stmt->bindParam('t', $time);
    $stmt->bindParam('p', $phone);
    $stmt->bindParam('d', $date);
    $stmt->bindParam('st', $status);

    // create a second statement for the admin
    $permstmt = $conn->prepare("INSERT INTO permorders (firstname, lastname, email, subtotal, bag, timesent, phone, date) VALUES (:f, :l, :e, :s, :b, :t, :p, :d)");
    $permstmt->bindParam('f', $firstname);
    $permstmt->bindParam('l', $lastname);
    $permstmt->bindParam('e', $email);
    $permstmt->bindParam('s', $subtotal);
    $permstmt->bindParam('b', $bag);
    $permstmt->bindParam('t', $time);
    $permstmt->bindParam('p', $phone);
    $permstmt->bindParam('d', $date);

    // insert
    if ($stmt->execute() && $permstmt->execute()) {
        session_unset();
        $stmt = $conn->prepare("SELECT * FROM wait");
        $stmt->execute();
        $result = $stmt->fetchALL(PDO::FETCH_ASSOC);
	
        // fill data into the array
        $wait = $result;

        $currentWaitTime = $wait[0]["time"];
        echo "<h1 class='adminLogin'>Thank you for ordering!<br>Your order should be ready in approximately " . $currentWaitTime . ".</h1>";
    } else {
        echo "<h1 class='adminLogin'>There was an error sending your order. Please try again, and we apologize for the inconvenence.</h1>";
    }
    } else {
        session_unset();
        echo "<h1 class='adminLogin'>You have one or more items in your bag that are not available at this time. Please return to the order page and make selections based off of our current offerings.</h1>";
    }
} else {
    header("Location: bag.php?error");
}

?>
<?php include("../private/shared/globalfooter.php"); ?>