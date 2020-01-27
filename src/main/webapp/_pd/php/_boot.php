<?php 
define('PDSC', 'C:/KAPPS/WWW/StaticWeb/www/R/pd/');
define('PDPHP', __DIR__);
define('PD', PDPHP.'/../../../../..');
define('KWWW',PD .'/../../../');

define('UF', PD.'/../R/pd/');
define('PDW', PD.'src/main/webapp/');

define('KLIB', KWWW.'predixiWeb/app/library/');

require  KWWW.'predixiWeb/conf/_config.php';

require KLIB . 'dbH.php';
require KLIB . 'dbNodeH.php';
require KLIB . 'sessH.php';

//sessH::start(TRUE);
// if (!isset($_SESSION['user']))
//     exit('notlogin');
// if ( $_SESSION['user']['uLevel']<1000 )
//     exit('notauth');
?>