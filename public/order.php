<?php require_once("../private/functions/initialize.php");
include("../private/shared/globalheader.php"); ?>

<!--In order to give each image a different image we will need to give them IDs-->
<div class="orderImages">
<a href="<?php echo urlfor("public/meals/breakfast.php"); ?>" class="hero-image">
<div class="hero-text">
<p>Breakfast</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/lunch.php"); ?>" class="hero-image">
<div class="hero-text">
<p>Lunch</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/dinner.php"); ?>" class="hero-image">
<div class="hero-text">
<p>Dinner</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/dessert.php"); ?>" class="hero-image">
<div class="hero-text">
<p>Desserts</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/drinks.php"); ?>" class="hero-image">
<div class="hero-text">
<p>Drinks</p>
</div>
</a>

<a href="<?php echo urlfor("public/meals/specials.php"); ?>" class="hero-image">
<div class="hero-text">
<p>Specials</p>
</div>
</a>
</div>

<?php include("../private/shared/globalfooter.php"); ?>