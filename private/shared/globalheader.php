<!DOCTYPE html>
<html>
<head>
	<title>Christopher's Restaurant</title>
	<!--Room for stylesheets and PHP -->
	<link rel="stylesheet" type="text/css" href="../private/shared/styles/styles.css"> <!--Waiting for dynamic php statements -->
</head>
<body>
	<header>
		<!--Nav bar is at the top of every page -->
		<div class="navWrapper"> <!--Includes entire nav system-->
			<div class="navBar" id="navBar"> <!--Just Includes the navbar which will float with the page-->
					<a id="home" href=HomePagePlaceholder>Home</a> <!--Waiting for dynamic php statements -->
					<a id="menu" href=MenuPagePlaceholder>Menu</a> <!--Waiting for dynamic php statements -->
					<a id="order"href=OrdersPagePlaceholder>Order</a> <!--Waiting for dynamic php statements -->
					<a id="bag"href=BagPagePlaceholder>Bag</a> <!--Waiting for dynamic php statements -->
			</div>
			<div class="navLogo"><!--Includes Christopher's Icon logo -->
				<img class="navImg" src="../private/shared/images/chrisLogo.png"> <!--Waiting for dynamic php statements -->
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