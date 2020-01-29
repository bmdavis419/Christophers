<?php require_once("../private/functions/initialize.php");
include("../private/shared/globalheader.php"); ?>

<script type="text/javascript">
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
	<div class="menuPage">
	<div id="accordionCtrl" class="outerAccordion"><!--Opens Outer accordion -->
        <h3>Breakfast</h3> <!--Outer Header -->
        <div><!--Identifies the content associated with outer header -->
				<div id="innerAccordionCtrl" class="innerAccordion"><!--inner accordion -->
					<h5>Inner Accordion Header</h5>   <!--Outer Header -->
					<div> <!--Identifies the content associated with inner header -->
						<h5>Name of Dish</h5>
							<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
							<p id="price">$PRICE</p>
							<br> <!--Above h5-br are all dynamic content within inner content -->
					</div> <!--closes inner content-->
					<!--To add an extra inner element copy the <h5>-</div> -->
					<!--Below are more inner accordion headers as example content -->
					<h5>Inner Accordion Header</h5>
					<div>
						<h5>Name of Dish</h5>
							<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
							<p id="price">$PRICE</p>
							<br>
					</div>
					<h5>Inner Accordion Header</h5>
					<div>
						<h5>Name of Dish</h5>
							<p class="desc">Description Description Description Description Description Description Description Description Description Description Description Description</p>
							<p id="price">$PRICE</p>
							<br>
					</div>
				</div><!--Closes inner accordion -->
		</div> <!--Closes outer content -->
			<!--To add outer content copy <h3>-</div>(directly above)-->
    </div><!--Closes outer accordion -->
		<hr> <!-- line between accordions -->
		<!--To add a copy of an outer accordion copy <div id="accordionCtrl">-<hr> -->

        </div>
<?php include("../private/shared/globalfooter.php"); ?>