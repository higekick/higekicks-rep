<?php

class dataAccessObject{

	private $connection;

	public function getConnection(){
		$db_address = 'localhost';
		$user_name = 'root';
		$password = '';
		$database = 'sql_yuto';

	//	if ($this->connection = null){
			$this->connection = new mysqli($db_address, $user_name, $password, $database);
	//	}
		// Connection check
		if ($this->connection === false){
		die("ERROR : Could not connet. " . mysqli_connect_error());
		}
		
		return $this->connection;
	}

	public function closeConnection(){
		if ($this->connection != null){
			$this->connection -> close();
		}
	}
}
?>