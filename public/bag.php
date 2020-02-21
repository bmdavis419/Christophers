<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>
<?php session_start(); ?>

<!--This page will be populated directly from the checkout page if it is clicked -->
<?php
// "Steak,22.99,5e470b3665b554.32533391.jpg,Steak Sauce: No,Side Salad Dressing: Ceasar,Side Salad Dressing: Blue Cheese,"
// echo out the items in the bag
$bagItems = $_SESSION["bag"];
for ($i = 0; $i < count($bagItems); $i++) {
    // split the bag item string
    $itemDetails = explode(",", $bagItems[$i]);
    array_pop($itemDetails);
    
    // create the item
}
?>

<div class="checkoutImgWrapper">
        <a class="checkout" src="DYNAMICPLACEHOLDER"></a>
    </div>
    <div class="checkoutDesc">
                <h5 class="checkout">Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
                <p id="price">$PRICE</p>                
                <p id="selectedOptions">passed in data from the user selection and formatted accordingly POTENTIALOPTION - SELECTEDOPTION, REPEAT</p>
                            
                                                              
</div>
<hr>
<div class="checkoutImgWrapper">
        <a class="checkout" src="DYNAMICPLACEHOLDER"></a>
    </div>
    <div class="checkoutDesc">
                <h5 class="checkout">Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
                <p id="price">$PRICE</p>               
                <p id="selectedOptions">passed in data from the user selection and formatted accordingly POTENTIALOPTION - SELECTEDOPTION, REPEAT</p>
                               
                                
                                
</div>
<hr>
<?php include("../private/shared/globalfooter.php"); ?>
