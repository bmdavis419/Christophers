<?php
session_start();
if (isset($_SESSION['valid'])&& ($_SESSION['valid'] = true)){
    // unset the session and leave
    session_unset();
    header("Location: index.php");
}
?>