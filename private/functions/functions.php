<?php 
// create the url for function, an easy way to put paths in html
function urlfor($path) {
    // add the leading '/' if not present
	if ($path[0] != '/') {
		$path = "/" . $path;
    }
    // retunr the file path from the top level directory
	return WWW_ROOT . $path;
}

// create a function to sanitize data
function sanitize($input) {
	$input = trim($input);
	$input = stripslashes($input);
	$input = htmlspecialchars($input);
	return $input;
}
?>