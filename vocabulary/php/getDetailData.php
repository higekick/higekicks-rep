<?php

	if(isset($_GET['id'])){
		
	$voc_id = $_GET['id'];
	include('../../util/getDbConnection.php');

		$dao = new dataAccessObject; 
		//DB connection
		$connection = $dao -> getConnection();
		
		$sql = "select id,word,partofspeech,meaning,example,source from vocabulary where id = " . $voc_id;
		
		$dataObj = array(
			"id" => "",
			"word" => "",
			"meaning" => ""
		);
		if ($result = $connection -> query($sql)){
			if ($result->num_rows == 1){
				$val = $result->fetch_object();
				$dataObj["id"] = $val->id;
				$dataObj["word"] = $val->word;
				$dataObj["pos"] = $val->partofspeech; 
				$dataObj["meaning"] = $val->meaning;
				$dataObj["example"] = $val->example;
				$dataObj["source"] = $val->source;
				
			}else{
				$dataObj = "dataError";
				echo "error: id dose not exist in database";
			}
          $result -> close();	
		}	
		$dao -> closeConnection();
		echo json_encode($dataObj);
	}
?>