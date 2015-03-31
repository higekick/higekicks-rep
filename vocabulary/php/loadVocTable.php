<?php
// include('../../util/tblBuilder.php');
include_once(dirname(__FILE__).'/../../util/tblBuilder.php');
	//DB culumn
	$culumn_set = array();
	//table header
	$tbl_header = array();	
if(isset($_GET['data'])){
// choose culumns by parameter from javascript
	$data = $_GET['data'];
	$culumn_set = $data['tblColumns'];
	$tbl_header = $data['tblHeaders'];
	//the table to get data
	$dbtbl = "vocabulary";
	$tblId = $data['tblId'];
}
else{
	// all culumn request
	//DB culumn
	$culumn_set = array('id', 'word', 'meaning', 'example', 'create_date');
	//table header
	$tbl_header = array('id','word', 'meaning' , 'example sentence', 'entry date');
	//the table to get data
	$dbtbl = "vocabulary";
	$tblId = "vocabulary";
}

buildVocTable();

function buildVocTable(){
	global $tbl_header,$culumn_set,$dbtbl,$tblId;
	//table making class instance
	$tblBuilder = new TableBuilder();
	$tblBuilder -> setMaterials($tbl_header,$culumn_set,$dbtbl,$tblId);	
	echo $tblBuilder -> build();
}
?>
