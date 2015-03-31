<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">    
<link rel="stylesheet" href="css/vocabulary.css" type="text/css">
<link rel="stylesheet" href="css/redmond/jquery-ui-1.10.3.custom.css" type="text/css">
<link rel="stylesheet" href="css/jquery.dataTables.css" type="text/css">
<link rel="stylesheet" href="css/jquery.dataTables_themeroller.css" type="text/css">

<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/UtilContainer.js"></script>
<script type="text/javascript" src="js/vocabularyBuilder.js"></script>
<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/linkObjects.js"></script>
<script type="text/javascript" src="js/linkHandler.js"></script>
    
<title>Vocabulary Builder</title>
<head/>
<body>
<div class="ui-widget">
<H1 class='ui-widget-header'> Vocabulary Builder 1.0
<span class="subtitle"> for building up your vocabulary </span>
</H1>

<div id='button-area'>
<button class="rich-buttons" id="register-vocabulary">Create new Vocaburary</button>
<button class="rich-buttons" id="showDetail-vocabulary">Show Detail</button>
</div>
<div id='datepicker'></div>
<div id="dialog-div" title="Detail"></div>
<div id="table-listing-area">
<?php
// vocabulary listing
include('/php/loadVocTable.php');
?>
</div>

</div>
</body>

</html>