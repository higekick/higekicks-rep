<?php
	include('../util/getDbConnection.php');

//	if(isset($_POST['submit'])){
		$dao = new dataAccessObject; 
		//DB connection
		$connection = $dao -> getConnection();

		//Check input value
		if (isInputValError() != true){
			//Retrieve value
			//Insert value
			insertValue($connection);
		}
	    $dao -> closeConnection();
//	}
?>

<?php

function insertValue($connection){

	$voc_name = $connection->escape_string($_POST['voc_name']);
	$voc_meaning = $connection->escape_string($_POST['voc_meaning']);
	$voc_example = $connection->escape_string($_POST['example_sentence']);

	$sql = "INSERT INTO vocabulary(word,meaning,example,create_date) values ('$voc_name','$voc_meaning','$voc_example', curdate())";
	
	if ($connection->query($sql) === true){
	echo "New word entried: " . $voc_name . ", id :" . $connection->insert_id;
	} else {
	echo "Error: could not entry the word. SQL=" . $sql . $connection->error;
	}
}

function isInputValError(){
	$inputError = false;
	
	if (empty($_POST['voc_name'])){
	echo 'ERROR: Please enter a valid vocabulary to register.';
	$inputError = true;
	}
	
	if (empty($_POST['voc_meaning'])){
	echo 'ERROR: Please enter a valid vocabulary meaning to register.';
	$inputError = true;
	}
	return $inputError;
}

?>
