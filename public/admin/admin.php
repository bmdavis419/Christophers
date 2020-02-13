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
<a class="adminDirectory" href="<?php echo urlfor('public/admin/menuadd.php'); ?>">Menu  </a>
<a class="adminDirectory" href="<?php echo urlfor('public/admin/propertyadd.php'); ?>">Properties</a>
</div>
<?php
} else {
	echo 'Access denied';
}
if (time() > $_SESSION['timeout'] + 1800){ // implement session regeneration functionality 
	session_regenerate_id(true);
}
include("../../private/shared/globalfooter.php"); 
?>
