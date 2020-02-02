<?php require_once("../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../private/shared/globalheader.php"); ?>
<!--Homepage Image, potential gallery -->
<main>
<div class="slideshow-container">
<div class="indexImgContainer">
<!--Add another mySlides fade image to increase slides-->
<div class="mySlides fade">
  <img class="indexImg" src="<?php echo urlfor('/private/images/index.jpg');?>" style="width:100%">
</div>

<div class="mySlides fade">
  <img class="indexImg" src="<?php echo urlfor('/private/images/index.jpg');?>" style="width:100%">
</div>

<div class="mySlides fade">
  <img class="indexImg" src="<?php echo urlfor('/private/images/index.jpg');?>" style="width:100%">
</div>

<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>

</div>
<br>
<!--If you add an image you have to add a dot-->
<div class="dots" style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span> 
</div>
</div>
<article class="indexArticle">
<h1>Hidden in Woodman Plaza, Christopher's has been a Dayton gem for over 28 years.</h1>
<h2>PHOTOS BY BROOKE MEDLIN</h3>
<p>A tasty Kettering tradition established in 1991. Christopher’s Restaurant & Catering has been serving the community for over 28 years.  Providing traditional and innovative fare at reasonable prices, our menu is designed to accommodate any palate, dietary preference or budget. Christopher’s has become a favorite local gathering spot, and is located at 2318 East Dorothy Lane (intersection of Dorothy Lane and Woodman)
</p>
<p>To this day we are proud to remain family owned and independent and honored to steadily employing over 50 local food-service professionals from in and around the community.
</p>
<p>Christopher’s is pleased to offer local and naturally raised meats, fresh salmon from the Faroe Islands, local cage-free brown eggs, locally baked breads, fair trade organic coffee and teas, and many vegetarian and vegan options. Local produce is always sourced when available.
</p>
<p>Breakfast (7:30am-1pm), lunch, dinner, light fare and homemade desserts are served Monday through Saturday, from 7:30 am-9pm. (Currently closed Sundays.) Amazing special features are available daily, and our legendary Cabbage Rolls are available every Monday night! Additionally, Christopher’s serves a rotating selection of wines and craft beers.
</p>
 
<br>
<p>Christopher’s great quality food and outstanding service is also available through our catering services.  Catering is available for a wide range of business and personal needs. For more information, please call 937-299-0089, or visit www.christopherscatering.biz
</p>
</article>
<aside class="indexAside">
<h2>PHONE</h2>
(937) 299-0089

 

<h2>LOCATION</h2>
2318 E. Dorothy Lane
Kettering, OH 45420

 

<h2>HOURS</h2>
Mon-Sat 7:30a.m–9p.m<br>

SPECIAL HOLIDAY HOURS:<br>

Christmas Eve Day 7:30-2:30<br>

Christmas Day: CLOSED<br>

New Year’s Day:  CLOSED<br>

Sun Closed<br>
</aside>

<script>
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
</script>

</main>
<?php include("../private/shared/globalfooter.php"); ?>
