<?php
require  '_boot.php';


if (isset($_GET['save'])) {
    $path=PDSC.$_GET['path'];

    $file_handle = fopen(escapeshellcmd($path.'.xml'), 'w');
    fwrite($file_handle, rawurldecode($_POST["xml"]));
    fclose($file_handle);

    $file_handle = fopen( escapeshellcmd($path.'.svg'), 'w');
    fwrite($file_handle, rawurldecode($_POST["svg"]));
    fclose($file_handle);
}
