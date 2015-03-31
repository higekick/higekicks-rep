<?php	
    	if(isset($_POST['updateData'])){
		include('../../util/getDbConnection.php');
		$dao = new dataAccessObject; 
		//DB connection
		$connection = $dao -> getConnection();
		$dataObj = array(
			"result" => "",
			"message" => ""
    		);

        	$dataObj = updateValue($_POST['updateData'], $connection, $dataObj);
	    	$dao -> closeConnection();
    		echo json_encode($dataObj);
	}else{
		echo "parameter is not received propery";
	}

function updateValue($updateData,$connection,$dataObj){

    $result = false;
    
    $updateString = "";    
	foreach( $updateData as $key => $value ){
        if ($key !== 'id'){
            $nValue = $connection->escape_string($value);
            $updateString .= " `" . $key . "`= '" . $nValue . "',";
        }
    }
	 
    //最後のコンマを削る
    //$updateString = substr($updateString,0,strlen()-1);
    
    //最後に更新日付を付けるので↑のコンマは削る必要なし
    $updateString .= '`update_date`' . '=' . 'curdate()';
    
	$sql = "UPDATE `vocabulary` SET " . $updateString . " WHERE `id` = " . $updateData['id'];
	
	if ($connection->query($sql) === true){
        $dataObj['message'] = "The Word update: " . "id :" . $updateData['id'];
        $dataObj['result'] = "success";
	} else {
	    $dataObj['message'] =  "Error: could not update the word: SQL=" . $sql;
        $dataObj['result'] = "failed";
	}
    return $dataObj;
}
?>
