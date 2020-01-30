<!DOCTYPE html>
<html>
<head>
	<title>Christopher's Restaurant</title>
	<!--Room for stylesheets and PHP -->
		<!--Room for stylesheets and PHP -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo urlfor('/private/styles/styles.css'); ?>">
	<link rel="stylesheet" href="<?php echo urlfor('/private/scripts/jquery-ui-1.11.1/jquery-ui.css'); ?>">

	<!-- Scripts -->
	<script src="<?php echo urlfor('private/scripts/jquery-1.11.1.js'); ?>"></script>
	<script type="text/javascript" src="<?php echo urlfor('/private/scripts/jquery-ui-1.11.1/external/jquery/jquery.js'); ?>"></script>
	<script type="text/javascript" src="<?php echo urlfor('/private/scripts/jquery-ui-1.11.1/jquery-ui.js'); ?>"></script>
</head>
<body>
	<header>
		<!--Nav bar is at the top of every page -->
		<div class="navWrapper"> <!--Includes entire nav system-->
			<nav class="navBar" id="navBar"> <!--Just Includes the navbar which will float with the page-->
					<a id="home" href="HomePagePlaceholder">Home</a> <!--Waiting for dynamic php statements -->
					<a id="menu" href=MenuPagePlaceholder>Menu</a> <!--Waiting for dynamic php statements -->
					<a id="order"href=OrdersPagePlaceholder>Order</a> <!--Waiting for dynamic php statements -->
					<a id="bag"href=BagPagePlaceholder>Bag</a> <!--Waiting for dynamic php statements -->
			</nav>
			<div class="navLogo"><!--Includes Christopher's Icon logo -->
				<img class="navImg" src="<?php echo urlfor('/private/images/chrisLogo.png');?>">
 <!--Waiting for dynamic php statements -->
			</div>
		</div>
	
		<script>
			//If the page scrolls down the navbar transitions to sticky version
		window.onscroll = function() {myFunction()};

		var navbar = document.getElementById("navBar");
		var sticky = navbar.offsetTop;

		function myFunction() {
 			 if (window.pageYOffset >= sticky + 50) { 
  			  navbar.classList.add("sticky")
  			} else {
    			navbar.classList.remove("sticky");
			
  }
}
</script>
