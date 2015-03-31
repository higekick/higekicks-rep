<?php

	if(isset($_POST['id'])){
		
	$voc_id = $_POST['id'];
	include('../../util/getDbConnection.php');

		$dao = new dataAccessObject; 
		//DB connection
		$connection = $dao -> getConnection();
		
		$sql = "delete from vocabulary where id = " . $voc_id;
		if ($connection->query($sql) === true){
			echo "delete word: " . $voc_id ;
		} else {
			echo "Error: could not delete. SQL=" . $sql . $connection->error;
		}
		$dao -> closeConnection();
	}
?>