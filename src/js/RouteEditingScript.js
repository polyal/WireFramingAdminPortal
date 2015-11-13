var routePoints = []; //A list of two elment arrays holding the coordinates of a route

window.onload = function () {

	var routes = document.getElementsByClassName("routes");
	var canvas = document.getElementById("viewport");
	var pointOne = null;
	var pointTwo = null;
	
	for(var i = 0; i < routes.length; i++) {
		console.log(routes[i].innerHTML);
		if(routes[i].innerHTML == "Route 1") {
			routes[i].addEventListener("click", function() {
			
				routePoints = [];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				context.beginPath();
				
				context.strokeStyle = '#0000FF';
				context.lineWidth = 3;
				context.moveTo(344.5,24);
				context.lineTo(26.5,248);
				context.stroke();
				context.lineTo(58.5,296);
				context.stroke();
				context.lineTo(372.5,76);
				context.stroke();
				context.lineTo(344.5,26);
				context.stroke();
				context.lineTo(344.5,24);
				context.stroke();
				
			});
		} else if(routes[i].innerHTML == "Route 2") {
			routes[i].addEventListener("click", function() {
			
				routePoints = [];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				context.beginPath();
				
				context.strokeStyle = '#0000FF';
				context.lineWidth = 3;
				context.moveTo(342.5,252);
				context.lineTo(272.5,146);
				context.stroke();
				context.lineTo(166.5,222);
				context.stroke();
				context.lineTo(198.5,272);
				context.stroke();
				context.lineTo(92.5,346);
				context.stroke();
				context.lineTo(128.5,400);
				context.stroke();
				context.lineTo(340.5,252);
				context.stroke();
				context.lineTo(342.5,252);
				context.stroke();
				
			});
		} else if(routes[i].innerHTML == "Route 3") {
			routes[i].addEventListener("click", function() {
			
				routePoints = [];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				context.beginPath();

				
				context.strokeStyle = '#0000FF';
				context.lineWidth = 3;
				context.moveTo(270.5,372);
				context.lineTo(372.5,296);
				context.stroke();
				context.lineTo(308.5,196);
				context.stroke();
				context.lineTo(198.5,272);
				context.stroke();
				context.lineTo(166.5,224);
				context.stroke();
				context.lineTo(58.5,298);
				context.stroke();
				context.lineTo(130.5,400);
				context.stroke();
				context.lineTo(238.5,324);
				context.stroke();
				context.lineTo(270.5,372);
				context.stroke();
				context.lineTo(270.5,372);
				context.stroke();
				
			});
		} else if(routes[i].innerHTML == "Route 4") {
			routes[i].addEventListener("click", function() {
			
				routePoints = [];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				context.beginPath();

			
				context.strokeStyle = '#0000FF';
				context.lineWidth = 3;
				context.moveTo(60.5,78);
				context.lineTo(20.5,106);
				context.stroke();
				context.lineTo(52.5,152);
				context.stroke();
				context.lineTo(0.5,194);
				context.stroke();
				context.lineTo(0.5,208);
				context.stroke();
				context.lineTo(56.5,296);
				context.stroke();
				context.lineTo(272.5,148);
				context.stroke();
				context.lineTo(202.5,48);
				context.stroke();
				context.lineTo(94.5,122);
				context.stroke();
				context.lineTo(62.5,80);
				context.stroke();
				context.lineTo(60.5,78);
				context.stroke();
				
			});
		}
	}
	
	canvas.addEventListener("click", function(e) {
		var x;
		var y;
		var rect = canvas.getBoundingClientRect();

		x = e.clientX - rect.left;
		y = e.clientY - rect.top;

		if(pointOne == null) {
			pointOne = [x, y];
			context.fillStyle="#FF0000";
		} else {
			pointTwo = [x, y];
			context.fillStyle="#0000FF";
		}

		context.fillRect(x-2, y-2, 7, 7);

		if(pointTwo != null) {
			context.strokeStyle = '#0000FF';
			context.lineWidth = 3;
			context.moveTo(pointOne[0],pointOne[1]);
			context.lineTo(pointTwo[0],pointTwo[1]);
			context.stroke();

			pointOne[0] = pointTwo[0];
			pointOne[1] = pointTwo[1];
		}

		routePoints.push( [x, y] );
	});

	context = canvas.getContext('2d');

	base_image = new Image();
	base_image.src = 'img/GuelphMap.png';
	base_image.onload = function() {
		context.drawImage(base_image, 0, 0, 373, 414);
	};
	

	document.getElementById("clear-route").addEventListener("click", function() {
			routePoints = [];
			context.drawImage(base_image, 0, 0, 373, 414);
			pointOne = null;
			pointTwo = null;
			context.beginPath();
		});

	document.getElementById("complete-route").addEventListener("click", function() {
		if (routePoints.length > 2) {
			context.lineTo(routePoints[0][0], routePoints[0][1]);
			context.stroke();
			routePoints.push(routePoints[0]);
		}
	});

};
