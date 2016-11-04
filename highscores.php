<!DOCTYPE html>
<html>
<head>
<link href='https://fonts.googleapis.com/css?family=Pacifico|Shadows+Into+Light' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="css/style.css">	

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

		<script>
			function updataDisplay() {
				$.post("postData.php", { action: 2 }, function(ajaxresult){
					$("#displayData").html(ajaxresult);
				});
			}
				
			$(document).ready(function(){
				
				updataDisplay();

				//the action values is used to run a particular function in the postData.php file
				// the other values, personFName etc, are also sent to the php file, in this case to be inserted in the database
				$("#insert_button").click(function(){ 
					$.post("postData.php", { action: 0, personName: $("#insert_name").val(), personScore: $("#insert_score").val() , personDifficulty: $("#insert_difficulty").val()}, function(ajaxresult){});
					updataDisplay();
				});

			});
		</script>

</head>
<body>
	<div id="border" class="auto-height">
		<h1>GeoGuesser</h1>
			<h2>High Scores</h2>
			<h4 class="speech">Name / Score / Difficulty</h4>
			<div id="displayData" class="force-scrollable"></div>
			<div id="bottom_left1001">
				<div id="center008">
					<div id="menu007">
						<a href="index.html"><p class="button1">Back to Main Menu</p></a>
					</div>
				</div>
			</div>
			
			

		<img src="images/diglett.png" alt="Click to view the creaters of the game" style="width:;height:;" id="bottom_right1001" href="about_us.html">
	</div>
</body>
</html>