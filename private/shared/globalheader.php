<!DOCTYPE html>
<html>
<head>
	<title>Christopher's Restaurant</title>
	
	<!--Room for stylesheets and PHP -->

	<!--Temporary Styling until sheets are made -->
<style> 
html {
background-color:black;
}

.navBar a{
  float: left;
  display: block;
  color: white;
  text-align: center;
  margin: 3% 8%;
  width:9%;
  text-decoration: none;
  font-size: 30px;
  }
  
#menu {
margin-right:12%;
margin-left:4%;
}
#order {
margin-right:4%;
margin-left:12%;
}

.navLogo {
position:absolute;
width:20%;
margin:0% 40%;
overflow:hidden;
}
img.navImg { 
	width:100%;
	height: 100%;
	}


.sticky {
  position: fixed;
  top: 0;
  width:100%;
}
</style>
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