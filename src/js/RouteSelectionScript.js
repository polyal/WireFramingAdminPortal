window.onload = function () {
	var routes = document.getElementsByClassName("routes");
	console.log("FUCK");
	console.log(routes);
	for(var i = 0; i < routes.length; i++) {
		console.log(routes[i].innerHTML);
		if(routes[i].innerHTML == "Route 1") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMapRoute1.png";
			});
		} else if(routes[i].innerHTML == "Route 2") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMapRoute2.png";
			});
		} else if(routes[i].innerHTML == "Route 3") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMapRoute3.png";
			});
		} else if(routes[i].innerHTML == "Route 4") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMapRoute4.png";
			});
		}
	}
}