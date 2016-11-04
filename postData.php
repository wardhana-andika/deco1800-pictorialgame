<?php
	include('db_conf.php');
	//connect to database
	$mysqli = new mysqli($DB_HOST, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);
	$action=$_POST["action"];
	//depending on the action value, run a different function
	switch ($action) {
	    case 0:
	    	insertData($mysqli);
	        break;
	    case 1:
	    	//deleteData($mysqli);
	    	break;
		case 2:
			getData($mysqli);
			break;
		case 3:
			//getDataById($mysqli);
			break;
		case 4:
			//login($mysqli);
			break;
	}

	function insertData($mysqli) {
		//insert data
       	$person_name=$_POST["personName"];
		$person_score=$_POST["personScore"];
		$person_difficulty=$_POST["personDifficulty"];

		//if one of the names is missing, do nothing
		if (($person_name == null) || ($person_score == null) || (person_difficulty == null)) {
			return;
		}

		$query = "INSERT INTO high_score(name, score, difficulty) VALUES ('" . $person_name . "', '" . $person_score . "', '" . $person_difficulty . "')";
		$result = $mysqli->query($query);
	}

	
	
	function getData($mysqli) {
		//get data
		$query = "SELECT * FROM high_score ORDER BY score DESC";
		$result = $mysqli->query($query);
		
		while(list($id, $first_name, $last_name, $what) = $result->fetch_row()) {
			if ($what == "1") {	
				echo $first_name . " " .  $last_name . " Easy ". "<br/>";
			} elseif ($what == "2") {				
				echo $first_name . " " .  $last_name . " Medium". "<br/>";
			} else {			
				echo $first_name . " " .  $last_name . " Hard" . "<br/>";
			}
		}
	}
	

	$mysqli->close();
?>