			
function displayCookie() { 
	var difficulty = getCookie("difficulty");
	if (difficulty == null) {difficulty="No cookie found";}
}

function getCookie(name) {
	var name = name + "=";
	var reader = document.cookie.split(';');
	for(var i=0;i < reader.length;i++) {
		var c = reader[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return null;
}

function saveScore(score) {
	document.cookie="score="+score+"; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
}