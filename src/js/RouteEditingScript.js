window.onload = function () {
	var routes = document.getElementsByClassName("routes");
	console.log("FUCK");
	console.log(routes);
	for(var i = 0; i < routes.length; i++) {
		console.log(routes[i].innerHTML);
		if(routes[i].innerHTML == "Route 1") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMap.png";
			});
		} else if(routes[i].innerHTML == "Route 2") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMap.png";
			});
		} else if(routes[i].innerHTML == "Route 3") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMap.png";
			});
		} else if(routes[i].innerHTML == "Route 4") {
			routes[i].addEventListener("click", function() {
				document.getElementById("map_image").src = "img/GuelphMap.png";
			});
		}
	}
};