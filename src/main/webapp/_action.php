<?php 
require  '../../../_SCREEN/_boot.php';

$file_handle = fopen(UF.escapeshellcmd('screens.xml'), 'w');
fwrite($file_handle, urldecode($_POST["xml"]));
fclose($file_handle);

$file_handle = fopen(UF.escapeshellcmd('screens.svg'), 'w');
fwrite($file_handle, urldecode($_POST["svg"]));
fclose($file_handle);

var_dump($_POST);

