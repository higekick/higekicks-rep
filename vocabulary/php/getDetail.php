<?php

	if(isset($_POST['id'])){
	
	$rtrn_data="";	
	$voc_id = $_POST['id'];
	include('../../util/getDbConnection.php');

		$dao = new dataAccessObject; 
		//DB connection
		$connection = $dao -> getConnection();
		
		$sql = "select id,word,meaning,example from vocabulary where id = " . $voc_id;
		if ($result = $connection -> query($sql)){
			if ($result->num_rows == 1){
				$val = $result->fetch_object();
				$rtrn_data .= "id: " . "<div id='det_voc_id'>" . $val->id . "</div>";
				$rtrn_data .= "word: " .$val->word . "</br>"; 
				$rtrn_data .= "meaning: " . $val->meaning. "</br>";
			}else{
				$rtrn_data = "dataError";
			}
		}	
		$result -> close();	
		$dao -> closeConnection();
		echo $rtrn_data;
	}
?>