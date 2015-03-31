<?php
	include('../../util/getDbConnection.php');

    $dataObj = array(
			"result" => "",
			"message" => ""
    );

	if(isset($_POST['items'])){
		$dao = new dataAccessObject; 
		//DB connection
		$connection = $dao -> getConnection();
        $dataObj = insDelValue($_POST['data'], $connection, $dataObj);
	    $dao -> closeConnection();
    echo json_encode($dataObj);
	}

function insDelValue($insDelData,$connection,$dataObj){

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
