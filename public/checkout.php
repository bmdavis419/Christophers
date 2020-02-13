<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>


<main class="checkout">
    <div class="checkoutImgWrapper">
        <a class="checkout" src="DYNAMICPLACEHOLDER"></a>
    </div>
    <div class="checkoutDesc">
                <h5 class="checkout">Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p id="checkout"class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
                                <p id="price">$PRICE</p>
</div>
<hr>
<div class="optionHeader">
<h6>Dynamically Entered Option Possibility</h6>
</div>
<div class="optionList">
    <div class="option" onclick="classList.add('clickedOption')"><p class="optionText">Possibility 1</p></div>
    <div class="option" onclick="classList.add('clickedOption')"><p class="optionText">Possibility 2</p></div>
</div>
</main>


<?php include("../private/shared/globalfooter.php"); ?>
