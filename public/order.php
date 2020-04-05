<?php require_once("../private/functions/initialize.php");
include("../private/shared/globalheader.php"); ?>

<style>
#isDisabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>

<?php
    date_default_timezone_set("America/New_York");
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

   $currentlyAvailable = "";

   // get the current range of availability
   $currentlyAvailable = array();
   if ($breakfastTimeStamp < $currentTimeStamp && $lunchTimeStamp > $currentTimeStamp) {
       $currentlyAvailable = "Breakfast";
   } else if ($lunchTimeStamp < $currentTimeStamp && $dinnerTimeStamp > $currentTimeStamp) {
       $currentlyAvailable = "Lunch";
   } else if ($dinnerTimeStamp < $currentTimeStamp && $closeTimeStamp > $currentTimeStamp) {
       $currentlyAvailable = "Dinner";
   } else {
       $currentlyAvailable = "None";
   }
?>

<script>
$("document").ready(() => {
    // get the current time
    var available = <?php echo json_encode($currentlyAvailable); ?>;
    if (available == "Breakfast") {
        $("#Lunch").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Lunch").removeAttr("href");
        $("#Dinner").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Dinner").removeAttr("href");
    } else if (available == "Lunch") {
        $("#Breakfast").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Breakfast").removeAttr("href");
        $("#Dinner").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Dinner").removeAttr("href");
    } else if (available == "Dinner") {
        $("#Lunch").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Lunch").removeAttr("href");
        $("#Breakfast").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Breakfast").removeAttr("href");
    } else if (available == "None") {
        $("#Lunch").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Lunch").removeAttr("href");
        $("#Breakfast").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Breakfast").removeAttr("href");
        $("#Dinner").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Dinner").removeAttr("href");
        $("#Drinks").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Drinks").removeAttr("href");
        $("#Desserts").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Desserts").removeAttr("href");
        $("#Features").attr("style", "cursor: not-allowed; opacity: 0.5;");
        $("#Features").removeAttr("href");
    }
});

</script>

<!--In order to give each image a different image we will need to give them IDs-->
<div class="orderImages">
<a href="<?php echo urlfor("public/meals/breakfast.php"); ?>" class="hero-image" id="Breakfast">
<div class="hero-text">
<p>Breakfast<br>7:30-11:00</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/lunch.php"); ?>" class="hero-image" id="Lunch">
<div class="hero-text">
<p>Lunch<br>11:00-4:30</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/dinner.php"); ?>" class="hero-image" id="Dinner">
<div class="hero-text">
<p>Dinner<br>4:30-9:00</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/dessert.php"); ?>" class="hero-image" id="Desserts">
<div class="hero-text">
<p>Desserts<br>All Day</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/drinks.php"); ?>" class="hero-image" id="Drinks">
<div class="hero-text">
<p>Drinks<br>All Day</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/specials.php"); ?>" class="hero-image" id="Features">
<div class="hero-text">
<p>Features</p>
</div>
</a>
</div>

<?php include("../private/shared/globalfooter.php"); ?>