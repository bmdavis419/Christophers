<?php require_once("../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../private/shared/cateringheader.php"); ?>
<!--Homepage Image, potential gallery -->
<main>
<div class="slideshow-container">
<div class="indexImgContainer">
<!--Add another mySlides fade image to increase slides-->
<div class="mySlides fade">
  <img class="indexImg" src="<?php echo urlfor('christophers/private/images/catering.jpg');?>" style="width:100%;">
</div>

</div>
<br>
<!--If you add an image you have to add a dot-->
</div>
<article class="indexArticle indexCatering">
<h1>Schedule Christopher's Catering for your next gathering!</h1>
<h2>PHOTOS BY BROOKE MEDLIN</h3>
<p>Make your dining experience as special as the day you are celebrating! For over 25 years, our catering staff has earned a reputation for providing exceptional food and service, custom tailored to meet the demands or limitations of any event budget. An expert team will help you plan every detail of your meal and ensure that all your expectations are met by our experienced staff.
</p>
<p>Please browse the <a href="menu.php">catering menu</a> and feel free to inquire about more options. We endeavor to accommodate all dietary requests and have experience preparing traditional and ethnic menus. The culinary possibilities for your event are nearly limitless.
</p>
<p>Use the contact page to make booking requests and schedule tastings, or contact a catering manager at (937) 299-0089 
</p>
 
<br>

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
