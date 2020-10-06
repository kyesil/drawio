<?php

$SC_PATH = $_GET['nscreen'] . '/' . $_GET['npage'];
$MX_CONTENT = '<mxGraphModel grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1900" pageHeight="1000" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>';

$MX_PATH = PDSC . '/' . $SC_PATH . '.xml';

if (!file_exists($MX_PATH)) {
    mkdir(PDSC . '/' . escapeshellcmd($_GET['nscreen'] . '/'), 0777, true);
    $file_handle = fopen(escapeshellcmd($MX_PATH), 'w');
    fwrite($file_handle, $MX_CONTENT);
    fclose($file_handle);
} 
?>
    <script>
        var _SC_PATH = '<?= $SC_PATH ?>';
        if (_SC_PATH) urlParams['open'] = 'U/s/E/pd/' + _SC_PATH + '.xml?'+Math.floor(Date.now() / 1000);
    </script>

