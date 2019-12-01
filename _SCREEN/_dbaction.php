<?php
require  '_boot.php';
require  '_dbC.php';

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');


$DB = new dbC();
$DB->connect('dbscreens');
$content = trim(file_get_contents("php://input"));
$_POST = json_decode($content, true);

switch ($_GET["action"]) {
    case "getsclist":
        $data = $DB->getScreens($_GET["param"], '');
        echo json_encode(array('result' => '1', 'data' => $data));
        break;
    case "getpglist":
        $data = $DB->getPages($_GET["param"], '');
        echo json_encode(array('result' => '1', 'data' => $data));
        break;
    case "savesc":
        $data = $DB->saveScreen(array($_GET['id'], $_GET['name'], $_GET['authpath'], $_GET['type']));
        echo json_encode(array('result' => '1', 'data' => $data));
        break;
    case "savepg":
        $data = $DB->savePage(array($_GET['id'], $_GET['sid'], $_GET['name'], $_GET['type']));
        echo json_encode(array('result' => '1', 'data' => $data));
        break;
    case "delsc":
        $data = $DB->delScreen(array($_GET['id']));
        echo json_encode(array('result' => '1', 'data' => $data));
        break;
    case "delpg":
        $data = $DB->delPage(array($_GET['id']));
        echo json_encode(array('result' => '1', 'data' => $data));
        break;
    case "status":
        echo json_encode(array('result' => '1', 'DB' => $DB, 'POST' => $_POST, 'GET' => $_GET, 'COOKIE' => $_COOKIE));
        break;
    default:
        echo json_encode(array('result' => '-1'));
        break;
}
