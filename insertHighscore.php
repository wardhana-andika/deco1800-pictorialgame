<!DOCTYPE html>
<html>
<head>
<link href='https://fonts.googleapis.com/css?family=Pacifico|Shadows+Into+Light' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="css/style.css">	

		<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
		<script src ="js/jquery-2.1.4.min.js"></script>
		<script src="js/cookie-manager.js"></script>

		<script>
			function updataDisplay() {
				$.post("postData.php", { action: 2 }, function(ajaxresult){
					$("#displayData").html(ajaxresult);
				});
			}				

			
			$(document).ready(function(){
				
				var diff = getCookie("difficulty");
				var diffMode = "";
				
				switch(diff) {
					case "1":
						diffMode = "Easy";
						break;
					case "2":
						diffMode = "Medium";
						break;
					case "3":
						diffMode = "Hard";
						break;
					default:
						diffMode = "No difficulty";
						break;
				}
				
				var score = getCookie("score");
				if (score == null){
					score = "No score";
				}
				
				document.getElementById("gameStats").innerHTML = "Difficulty: "+diffMode+" Score: "+score;
				
				updataDisplay();

				$("#insert_button").click(function(){ 
					$.post("postData.php", { action: 0, personName: $("#insert_name").val(), personScore: score , personDifficulty: diff}, function(ajaxresult){});
					updataDisplay();
					document.getElementById("nameInput").style.display = "none";
					updataDisplay();
				});

			});
		</script>

</head>
<body>
	<div class="longborder">
		<h1>GeoGuesser</h1>
		<div id = "nameInput">
			<h2>Enter Your Name:</h2>
			<h4 id="gameStats"></h4>
			<input type="text" id="insert_name"/>
			<input type="button" id="insert_button" value="Submit"/>
		</div>
		<br />
		<h4 class="speech">Name / Score / Difficulty</h4>
		<div id="displayData" class="force-scrollable">
		</div>
		
			<div id="bottom_left1001">
				<div id="center008">
					<div id="menu007">
						<a href="index.html"><p class="button1">Back to Main Menu</p></a>
					</div>
				</div>
			</div>
			
			

		<img src="images/diglett.png" alt="Click to view the creators of the game" style="width:;height:;" id="bottom_right1001" href="about_us.html">
	</div>
</body>
</html>