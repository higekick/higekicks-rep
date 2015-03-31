<?php

include('getDbConnection.php');

class TableBuilder{

	private $header;
	private $dbcolumns;
	private $dbtbl;
	private $tableId;

	public function setMaterials($header,$dbcolumns,$dbtbl,$tableId){
		$this -> header = $header;
		$this -> dbcolumns = $dbcolumns;
		$this -> dbtbl = $dbtbl;
		$this -> tableId =$tableId;
	}

	public function build(){

		$dao = new dataAccessObject;
		//DB connection
		$connection = $dao -> getConnection();

		$htmltbl='';
		$htmltbl .= "<table id='". $this->tableId . "'>\n";

		//header
		$htmltbl .= "<thead><tr>";
		foreach ($this->header as $head){
			$htmltbl .= "<th class='" . $head . "'>" . $head . "</th>";
		}
		$htmltbl .= "</tr></thead>\n";
					
		$sql = $this -> getSelectSQL($this->dbcolumns, $this->dbtbl);
		if ($result = $connection -> query($sql)){
			if ($result->num_rows > 0){
				//contents
				$htmltbl .= "<tbody>";
				while($row = $result->fetch_object()) {
					$htmltbl .= "<tr id='" . $row->id . "'>";
						foreach ($this->dbcolumns as $column){
						 $idForDrag = ($column === "word") ? " id=" . $row->id : ""; 
						 $htmltbl .= "<td" . $idForDrag . ">" . $row->$column ."</td>";
						}
					$htmltbl .= "</tr>\n";
				}
				$htmltbl .= "</tbody>";
			}
			$result -> close();
		}
		$htmltbl .= "</table>\n";	
		$dao -> closeConnection();
		return $htmltbl;
	}

	private function getSelectSQL($dbcolumns, $dbtbl){
		$dbcolumn_str = implode(', ', $dbcolumns);
		// make sql
		$sql = "select " . $dbcolumn_str . " from ". $dbtbl ;
		// echo $sql;
		return $sql;
	}
}

?>