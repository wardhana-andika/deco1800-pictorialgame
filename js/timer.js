/* experimental timer */

function startTimer()
{
	var difficulty = getCookie("difficulty");
	switch(difficulty) {
		case "1":
			count = 105;
			break;
		case "2":
			count = 70;
			break;
		case "3":
			count = 35;
			break;
		default:
			count = 150;
			break;
	} 
	
	
	counter = setInterval (function() {timer();}, 1000);
	function timer(){
		if(!pause){
			count -= 1;
			if(count<=0){
				clearInterval(counter);
				timeout();
			}
		}
		document.getElementById("timer1").innerHTML = count;
	}
}