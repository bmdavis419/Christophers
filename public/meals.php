<?php require_once("../private/functions/initialize.php");
include("../private/shared/globalheader.php"); ?>
<script type="text/javascript"> // the javascript needs to be on this page but all the styles already exist
$("document").ready(function() {
$(".outerAccordion").accordion({
	clearStyle:true,
	heightStyle:"panel",
	collapsible:true,
	active:false,
	
});

$(".innerAccordion").accordion({
	clearStyle:true,
	heightStyle:"panel",
	collapsible:true,
	active:false,
});
});
</script>
</head>
<body>
<!--In order to give each image a different image we will need to give them IDs-->
	<div class="MealPage____"><!--Placeholder-->
	<div id="accordionCtrl" class="outerAccordion">
	<h3>Classic Breakfasts</h3>
		<div>
	<!--This content should be dynamic-->
			<a href="placeholder" class="hero-image"><!--Links to correct template-->
					<div class="hero-text"><!--Put the name in here -->
						<p>Blueberry Pancakes</p>
					</div>
					<div class="hero-desc">
					<p>Tasty strips of chicken breast, avocado, tomato, provolone cheese, sprouts in a tangy southwestern sauce.
					Served with a cup of soup or side salad. - $10.99</p><!--Dynamically add desc and price on sides of this hyphen-->
					</div>
			</a>
	<!--Repeat!-->
			<a href="placeholder" class="hero-image">
				<div class="hero-text"><!--Put the name in here -->
						<p>Blueberry Pancakes</p>
					</div>
					<div class="hero-desc">
					<p>Turkey, ham, Swiss, cheddar, lettuce and tomato. - 6.95/10.95</p><!--Dynamically add desc and price on sides of this hyphen-->
					</div>
			</a>

			<a href="placeholder" class="hero-image">
				<div class="hero-text">
					<p>Barn Buster</p>
				</div>
			</a>
			<!--This content should be dynamic-->
			<a href="placeholder" class="hero-image"><!--Links to correct template-->
				<div class="hero-text"><!--Put the name in here -->
					<p>Blueberry Pancakes</p>
				</div>
			</a>
	<!--Repeat!-->
			<a href="placeholder" class="hero-image">
				<div class="hero-text">
					<p>Waffles</p>
				</div>
			</a>

			<a href="placeholder" class="hero-image">
				<div class="hero-text">
					<p>Barn Buster</p>
				</div>
			</a>

		<!--End dynamic zone-->
		</div>
		<h3>Omlettes</h3>
		<div>
			<!--This content should be dynamic-->
			<a href="placeholder" class="hero-image"><!--Links to correct template-->
				<div class="hero-text"><!--Put the name in here -->
					<p>Blueberry Pancakes</p>
				</div>
			</a>
	<!--Repeat!-->
			<a href="placeholder" class="hero-image">
				<div class="hero-text">
					<p>Waffles</p>
				</div>
			</a>

			<a href="placeholder" class="hero-image">
				<div class="hero-text">
					<p>Barn Buster</p>
				</div>
			</a>
			<!--This content should be dynamic-->
			<a href="placeholder" class="hero-image"><!--Links to correct template-->
				<div class="hero-text"><!--Put the name in here -->
					<p>Blueberry Pancakes</p>
				</div>
			</a>
	<!--Repeat!-->
			<a href="placeholder" class="hero-image">
				<div class="hero-text">
					<p>Waffles</p>
				</div>
			</a>

			<a href="placeholder" class="hero-image">
				<div class="hero-text">
					<p>Barn Buster</p>
				</div>
			</a>
		</div>
</div>
<?php include("../private/shared/globalfooter.php"); ?>