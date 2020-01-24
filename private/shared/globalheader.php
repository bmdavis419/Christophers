<!DOCTYPE html>
<html>
<head>
	<title>Christopher's Restaurant</title>
	
	<!--Room for stylesheets and PHP -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo urlfor('/private/styles/styles.css'); ?>">

	<!-- Sticky script -->
	<script>
	window.onscroll = function() {myFunction()};

	var navbar = document.getElementById("navBar");
	var sticky = navbar.offsetTop;

	function myFunction() {
  		if (window.pageYOffset >= sticky) {
    		navbar.classList.add("sticky")
  		} else {
    		navbar.classList.remove("sticky");
  		}
	}
	</script>
</head>
<body>
	<header>
		<!--Nav bar is at the top of every page -->
		<div class="navWrapper"> <!--Includes entire nav system-->
			<div class="navBar" id="navBar"> <!--Just Includes the navbar which will float with the page-->
					<a id="home" href=HomePagePlaceholder>Home</a>
					<a id="menu" href=MenuPagePlaceholder>Menu</a>
					<a id="order"href=OrdersPagePlaceholder>Order</a>
					<a id="bag"href=BagPagePlaceholder>Bag</a>
			</div>
			<div class="navLogo"><!--Includes Christopher's Icon logo -->
				<img class="navImg" src="chrisLogo.png">
			</div>
		</div>
	</header>