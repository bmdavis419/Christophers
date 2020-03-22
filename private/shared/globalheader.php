<!DOCTYPE html>
<html>
<?php ini_set('display_errors', 'Off'); ?>
<head>
	<title>Christopher's Restaurant</title>
	<!--Room for stylesheets and PHP -->
		<!--Room for stylesheets and PHP -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo urlfor('/private/styles/styles.css'); ?>">
	<link rel="stylesheet" href="<?php echo urlfor('/private/scripts/jquery-ui-1.12.1/jquery-ui.css'); ?>">
	<link href="https://fonts.googleapis.com/css?family=Merriweather&display=swap" rel="stylesheet">
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0">

	<!-- Scripts -->
	<script src="<?php echo urlfor('private/scripts/jquery-3.4.1.js'); ?>"></script>
	<script type="text/javascript" src="<?php echo urlfor('/private/scripts/jquery-ui-1.12.1/external/jquery/jquery.js'); ?>"></script>
	<script type="text/javascript" src="<?php echo urlfor('/private/scripts/jquery-ui-1.12.1/jquery-ui.js'); ?>"></script>
</head>
<body>
	<header>
		<!--Nav bar is at the top of every page -->
		<div class="navWrapper"> <!--Includes entire nav system-->
			<nav class="navBar" id="navBar"> <!--Just Includes the navbar which will float with the page-->
					<a id="home" href="<?php echo urlfor("public/index.php"); ?>">Home</a> <!--Waiting for dynamic php statements -->
					<a id="menu" href="<?php echo urlfor("public/menu.php"); ?>">Menu</a> <!--Waiting for dynamic php statements -->
					<a id="order"href="<?php echo urlfor("public/order.php"); ?>">Order</a> <!--Waiting for dynamic php statements -->
					<a id="bag"href="<?php echo urlfor("public/bag.php"); ?>">Bag</a> <!--Waiting for dynamic php statements -->
			</nav>
		<div class="mobileHeader">
        <div id='mobileNav' class="mobileNavBar">
            <div class="topNav">
                <nav class="burger">
                    <div id="line1"></div>
                    <div id="line2"></div>
                    <div id="line3"></div>
                </nav>
				<div class="navLogo">
                <img class="navImg" href="index.html" src="<?php echo urlfor('/private/images/chrisLogo.png');?>">
				</div>
            </div>
            <div class="mobileLinks">  
                <a href="<?php echo urlfor("public/index.php"); ?>" id="navLink">Home</a>
                <a href="<?php echo urlfor("public/menu.php"); ?>">Menu</a>
                <a href="<?php echo urlfor("public/order.php"); ?>" id="navLink">Order</a>
                <a href="<?php echo urlfor("public/bag.php"); ?>" id="navLink">Bag</a>
            </div>
        </div>
    </div>
	</div>
	
		<script>
			//If the page scrolls down the navbar transitions to sticky version
		window.onscroll = function() {myFunction()};
$(function() {
    $('.burger').click(function() {
        let nav = $('#mobileNav');
        if (nav.hasClass('mobileNavBar')) {
            nav.switchClass('mobileNavBar', 'burgerClicked', 1000);
            $('#line2').hide();
            $('#line1').css('transform', 'rotateZ(45deg) translateY(11px)');
            $('#line3').css('transform', 'rotateZ(-45deg) translateY(-11px)');
            $('#nameText').hide();
            $('.mobileLinks').css('display', 'flex');
        } else if (nav.hasClass('burgerClicked')) {
            nav.switchClass('burgerClicked', 'mobileNavBar', 1000, function() {
                $('#nameText').show();
                $('#line1').css('transform', 'none');
                $('#line3').css('transform', 'none');
                $('#line2').show();
                $('.mobileLinks').hide();
            });
        }
    });
}); 
		var navbar = document.getElementById("navBar");
		var sticky = navbar.offsetTop;

		function myFunction() {
			// check if the page has moved
 			 if (window.pageYOffset >= sticky + 50) { 
  			  navbar.classList.add("sticky");
			  navbar.classList.remove("navBar");
  			} else {
    			navbar.classList.remove("sticky");
				navbar.classList.add("navBar");			
  			}
		}
		</script>