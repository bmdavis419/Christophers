<?php require_once("../../private/functions/initialize.php");
// includes the initialize function as well as the global header
include("../../private/shared/globalheader.php"); ?>
<?php
// set good PHP.ini security settings (https://secure.php.net/manual/en/session.configuration.php)
//https://secure.php.net/manual/en/features.session.security.management.php
	ini_set('session.cookie_httponly', 1); // prevent javascript XSS session hijacking
	ini_set('session_use_strict_mode', 1); // recommended for hijacking mitigation
	ini_set('session_use_only_cookies', 1); // session ID can't be passed through URLs, use cookies
	ini_set('session.hash_function', 'whirlpool'); // hashing function whirlpool
	ini_set('session.use_trans_sid', 0); // disable transparent sid support
	ini_set('session.cookie_lifetime',1800); // set cookie timeout to 30 minutes
	ini_set('session.gc_maxlifetime', 1800); // server keeps session data for 30 minutes
	ini_set('session.gc_probability', 1);
	ini_set('session.gc_divisor',1);
//	ini_set('session.cookie_secure',1); // enable HTTPS support if available
	   session_start();
	   ob_start();
?>
<html>
	<head>
		<title>Christophers Administration</title>
	</head>
	<body class="adminIndex">

      	<h1 class="adminLogin" >Welcome to the Christopher login portal</h1> 
        <?php
            $msg = '';
            if (isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
		    session_regenerate_id(true); // prevents session fixation (http://www.php.net/session_regenerate_id)
	       	// avoid register_globals and filter input (http://us.php.net/filter)
	       	$password_string = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
	       	$username_string = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
	       	$hash = '$2y$10$6wjp13V68NxYUcu.3qFea.TADD4WhbhH8OvDXCJMmEpLWN.qn1XL2';

	       	// use the password_verify function to authenticate the password (https://secure.php.net/manual/en/function.password-verify.php)
               	if ($username_string=='admin' && password_verify($password_string, $hash)) {
               	   $_SESSION['valid'] = true;
               	   $_SESSION['timeout'] = time();
                   $_SESSION['username'] = $username_string;

		   // redirect to the admin page if true
		   header("Location: admin.php");
               } else {
                   $msg = 'Incorrect username or password';
               }
            }
      ?>
      <div class="container">
       <form class="reviewBox" role="form" action="" method="post">
            	<input class="adminUsername" type="text" class="form-control" name="username" placeholder="Username" required>
            	<input class="adminPassword" type="password" class="form-control" name="password" placeholder="Password" required>
            	<input class="adminButton" type="submit" name="login" value="Login">
       		</form>
      	</div>
   </body>
</html>


<?php include("../../private/shared/globalfooter.php"); ?>