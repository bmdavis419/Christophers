<?php 
session_start();
require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php");
// ini_set('display_errors', 'Off');
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
?>
<!-- LINKS TO MENU AND PROPERTY ADDITIONS -->
<div class="adminDirectoryContainer">
<h1 class="adminLogin" >Select Which You'd Like to Create:</h1> 
<a class="adminDirectory" href="<?php echo urlfor('public/admin/menuadd.php'); ?>">Menu  </a>
<a class="adminDirectory" href="<?php echo urlfor('public/admin/propertyadd.php'); ?>">Properties</a>
</div>
<form action="changewait.php" method="POST">
	<?php 
	// call database
	require("../../private/functions/databaseconfig.php");
	$stmt = $conn->prepare("SELECT * FROM wait");
	$stmt->execute();
	$result = $stmt->fetchALL(PDO::FETCH_ASSOC);
	$wait = $result;

	$currentWaitTime = $wait[0]["time"];

	echo ("<label for='currentwait'>Current wait time: <input type='text' id='currentwait' name='currentwait' readonly value='" . $currentWaitTime . "'></label><br>");
	?>
	<label for="wait">Enter the current wait time in the format you want users to see (ex: 40mins): <input type="text" id="wait" name="wait"></label>
	<button type="submit">Update</button>
</form>
<?php
} else {
	echo 'Access denied';
}
if (time() > $_SESSION['timeout'] + 1800){ // implement session regeneration functionality 
	session_regenerate_id(true);
}
include("../../private/shared/globalfooter.php"); 
?>
