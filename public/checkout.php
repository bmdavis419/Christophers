<?php require_once("../private/functions/initialize.php"); ?>
<?php include("../private/shared/globalheader.php"); ?>

<script>
			//If the page scrolls down the navbar transitions to sticky version
            function getClickedElement(clicked) {
		     
                var clickedBox = clicked;
                hasbeenClicked();
            }
		function hasBeenClicked() {
 			 
  		 this.classList.add("selected")//This function checks for clicked elements so you may want to use it for data to.
  }
</script>

<main class="checkout">
    <div class="checkoutImgWrapper">
        <a class="checkout" src="DYNAMICPLACEHOLDER"></a>
    </div>
    <div class="checkoutDesc">
                <h5 class="checkout">Name of Dish</h5> <!--IMPORANT:Include the date in weekly feature names name -->
								<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
                                <p id="price">$PRICE</p>
</div>
<hr>
<div class="optionHeader">
<h6>Dynamically Entered Option Possiblity</h6>
</div>
<div class="optionList">
    <div class="option" onclick=hasBeenClicked(this)>
</div>
</main>


<?php include("../private/shared/globalfooter.php"); ?>
