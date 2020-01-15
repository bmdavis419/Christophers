<?php
// script called when any page is loaded, it is the first thing included at the top

// require that the functions script is always included
require_once("functions.php");

// set up the WWW.ROOT constant, this will always get the location of the top level directory of the site
// get the position right before the public directory in the path string then get the substring of that part as a var and set is to be a constant
$top_level_index = strpos($_SERVER["SCRIPT_NAME"], "/public");
$doc_root = substr($_SERVER["SCRIPT_NAME"], 0, $top_level_index);
define("WWW_ROOT", $doc_root);
?>