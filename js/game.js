var levelCount = 1;
var count = 11;
var score = 0;
var pause = false;
var timeoutFlag = false;
var counter;
var loadedImages = [];
var loadedImages2 = [];
var loadedImages3 = [];
var loadedImages4 = [];
var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];
var outputDivs = ["output1", "output2", "output3", "output4"];
var urls = [];
var placeArray = [];
var place1 = "";
var place2 = "";
var place3 = "";
var place4 = "";

/* Geoguesser Game */	
/* CURRENTLY LIMITED TO 7 QUESTIONS */
/*click */

function displayfacts(){
		switch(levelCount){
	case 1:
		$("#Facts").html("The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza Necropolis bordering what is now El Giza, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.");
		break;
	case 2:
		$("#Facts").html("The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe.");
		break;
	case 3:
		$("#Facts").html("The Leaning Tower of Pisa or simply the Tower of Pisa (Torre di Pisa) is the campanile, or freestanding bell tower, of the cathedral of the Italian city of Pisa, known worldwide for its unintended tilt. It is situated behind the Cathedral and is the third oldest structure in Pisas Cathedral Square (Piazza del Duomo) after the Cathedral and the Baptistery. The towers tilt began during construction, caused by an inadequate foundation on ground too soft on one side to properly support the structure's weight");
		break;
	case 4:
		$("#Facts").html("The Forbidden City was the Chinese imperial palace from the Ming dynasty to the end of the Qing dynasty—the years 1420 to 1912. It is located in the centre of Beijing, China, and now houses the Palace Museum. It served as the home of emperors and their households as well as the ceremonial and political centre of Chinese government for almost 500 years.");
		break;
	case 5:
		$("#Facts").html("The Sydney Opera House is a multi-venue performing arts centre in Sydney, Australia. Situated on Bennelong Point in Sydney Harbour, close to the Sydney Harbour Bridge, the facility is adjacent to the Sydney central business district and the Royal Botanic Gardens, between Sydney and Farm Coves.");
		break;
	case 6:
		$("#Facts").html("Big Ben is the nickname for the Great Bell of the clock at the north end of the Palace of Westminster in London,[1] and often extended to refer to the clock and the clock tower. The tower is officially known as the Elizabeth Tower, renamed as such to celebrate the Diamond Jubilee of Elizabeth II.");
		break;
	case 7:
		$("#Facts").html("The Shrine of Remembrance, located in Kings Domain on St Kilda Road, Melbourne, Australia was built as a memorial to the men and women of Victoria who served in World War I and is now a memorial to all Australians who have served in war. It is a site of annual observances of ANZAC Day (25 April) and Remembrance Day (11 November) and is one of the largest war memorials in Australia.");
		break;
	default:
		//alert("this shouldnt appear, something broke");
		break;
	}
	
}

function clickCorrect(){
	$("#factoverlay").css("background-color","rgba(30, 150, 150, 0.5)");
	//document.getElementById("factoverlay").style.backgroundColor = "rgba(30, 150, 150, 0.5)";
	//document.getElementById("Facts").innerHTML = "correct!";
	displayfacts();
	updateScore();
	processInput();
}

function clickIncorrect(){
	$("#factoverlay").css("background-color","rgba(150, 30, 30, 0.5)");
	//document.getElementById("factoverlay").style.backgroundColor = "rgba(150, 30, 30, 0.5)";
	displayfacts();
	//document.getElementById("Facts").innerHTML = "incorrect!";
	processInput();	
}

function updateScore(){
	var difficulty = getCookie("difficulty");
	switch(difficulty) {
		case "1":
			score = score + 10;
			break;
		case "2":
			score = score + 15;
			break;
		case "3":
			score = score + 20;
			break;
		default:
			score = score + 1;
			break;
	} 
	$("#scoreValue").html(score);
	//document.getElementById("scoreValue").innerHTML = score;
}


/* end click */

function processInput(){
	pause = true;
	document.getElementById("factbox").style.display = "block";
	document.getElementById("factoverlay").style.display = "block";
	if(levelCount == 10){
		document.getElementById("Facts").innerHTML = "Game Over!";
		document.getElementById("next").innerHTML = "Proceed";
	}
}

function timeout(){
	timeoutFlag = true;
	document.getElementById("Facts").innerHTML = "Time out!";
	document.getElementById("factbox").style.display = "block";
	document.getElementById("factoverlay").style.display = "block";
}

function endGame(){
	clearInterval(counter);
	document.getElementById("factbox").style.display = "block";
	document.getElementById("factoverlay").style.display = "block";
}

function nextQuestion(){
	document.getElementById("factbox").style.display = "none";
	document.getElementById("factoverlay").style.display = "none";

//causes issue with addEventListener
//$("#transientBox").load(location.href+" #transientBox>*","");
	var outputDivsJq = ["#output1", "#output2", "#output3", "#output4"];
	for (var i = 0; i < 4; i++) {
		 $(outputDivsJq[i]).empty();
		 if (placeArray[i] == place2){
				document.getElementById(outputDivs[i]).removeEventListener("click", clickCorrect);
			}else{
				document.getElementById(outputDivs[i]).removeEventListener("click", clickIncorrect);
		}
	}

	//THE QUESTION LIMITER
	if(levelCount >= 7 || timeoutFlag == true){
		finishGame();
	} else{
		levelCount = levelCount + 1;
		pause = false;
		displayCookie();
		getImages();
	}
}

//courtesy of stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomizeAnswerPos(place1, place2, place3, place4) {
	
	var urlA = "http://api.trove.nla.gov.au/result?key=g2slgjdaievm8l4e&q=";
	var urlB = "&encoding=json&zone=picture&sortby=relevance&l-format=Photograph&n=50&l-availability=y/f&callback=?";
	var placeArray = [place1, place2, place3, place4];
		placeArray = shuffle(placeArray);
		
		for (var i = 0; i < 4; i++) {
			if (placeArray[i] == place2){
				urls.push(urlA+placeArray[i]+urlB);
				document.getElementById(outputDivs[i]).addEventListener("click", clickCorrect);
			}else{
				urls.push(urlA+placeArray[i]+urlB);
				document.getElementById(outputDivs[i]).addEventListener("click", clickIncorrect);
			}
		}
}

function generateQuestion(){
	//place2 is always the correct answer
	switch(levelCount){
	case 1:
		place1 = "melbourne";
		place2 = "pyramids of giza egypt";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Great Pyramid?";
		break;
	case 2:
		place1 = "melbourne";
		place2 = "great wall china";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Great Wall of China?";
		break;
	case 3:
		place1 = "melbourne";
		place2 = "tower of pisa";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Tower of Pisa?";
		break;
	case 4:
		place1 = "melbourne";
		place2 = "Forbidden city beijing";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Forbidden City?";
		break;
	case 5:
		place1 = "melbourne";
		place2 = "opera house sydney";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Sydney Opera House?";
		break;
	case 6:
		place1 = "melbourne";
		place2 = "big ben london";
		place3 = "sydney opera house";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Big Ben?";
		break;
	case 7:
		place1 = "melbourne";
		place2 = "Shrine of Remembrance";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Shrine of Remembrance?";
		break;
	//need more content
	case 8:
		place1 = "melbourne";
		place2 = "pyramids of giza egypt";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Great Pyramid?";
		break;
	case 9:
		place1 = "melbourne";
		place2 = "opera house sydney";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Sydney Opera House?";
		break;
	case 10:
		place1 = "melbourne";
		place2 = "opera house sydney";
		place3 = "big ben london";
		place4 = "brisbane";
		
		randomizeAnswerPos(place1, place2, place3, place4);
		document.getElementById("questionString").innerHTML = "which picture shows the Sydney Opera House?";
		break;
	default:
		alert("this shouldnt appear, something broke");
		break;
	}
	
			
}

$(document).ready(function(){
	mainGame();
});

function mainGame(){	
	displayCookie();
	getImages();
	startTimer();
}

function finishGame(){
	$("#transientBox").empty();
	saveScore(score);
	
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

				
	if(score <= 0){
		alert("Game Over!");
		window.location.href = "index.html";
		//window.location.href = "highscores.php"; if db is available
	} else{
		alert("Game Over! "+"difficulty: "+diffMode+" Score:"+score);
		window.location.href = "index.html";
		//window.location.href = "insertHighscore.php"; if db is available
	}
}
			