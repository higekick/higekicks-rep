<?php
	include('../../util/getDbConnection.php');

    $dataObj = array(
			"result" => "",
			"message" => ""
    );

//	if(isset($_POST['submit'])){
		$dao = new dataAccessObject; 
		//DB connection
		$connection = $dao -> getConnection();

		//Check input value
		if (isInputValError($dataObj) != true){
			//Insert value
			insertValue($connection,$dataObj) ? $dataObj["result"]="success" : $dataObj["result"]="failed";
		} else {
            $errorMessage='There are some errors in php/registerExec.php';
            throw new Exception($errorMessage);
            $dataObj["result"]="failed";
            $dataObj["message"] .= $errorMessage;
        }
	    $dao -> closeConnection();
    echo json_encode($dataObj);
//	}

function insertValue($connection,$dataObj){

    $result;
        
	$voc_name = $connection->escape_string($_POST['voc_name']);
	$voc_pos = $connection->escape_string($_POST['voc_pos']);//part of speech
	$voc_meaning = $connection->escape_string($_POST['voc_meaning']);
	$voc_example = $connection->escape_string($_POST['voc_example']);
	$voc_source = $connection->escape_string($_POST['voc_source']);
	
	$sql = "INSERT INTO vocabulary(word,partofspeech,meaning,example,source,create_date) values ('$voc_name','$voc_pos','$voc_meaning','$voc_example', '$voc_source', curdate())";
	
	if ($connection->query($sql) === true){
        $dataObj['message'] .= "New word entried: " . $voc_name . ", id :" . $connection->insert_id;
        $result = true;
	} else {
	    $dataObj['message'] .=  "Error: could not entry the word. SQL=" . $sql . $connection->error;
        $result = false;
	}
    return $result;
}

function isInputValError($dataObj){
	$inputError = false;
	
	if (empty($_POST['voc_name'])){
	$dataObj["message"] .= 'ERROR: Please enter a valid vocabulary to register.';
	$inputError = true;
	}
	
	if (empty($_POST['voc_meaning'])){
	$inputError = true;
    $dataObj["message"] .= 'ERROR: Please enter a valid vocabulary meaning to register.';    
	}
	return $inputError;
}

?>
