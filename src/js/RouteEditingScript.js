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

				routePoints = [ [344.5,24], [26.5,248], [58.5,296], [372.5,76], [344.5,26], [344.5,24] ];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				drawRoute();
				populateCoordinateHTMLList();

			});
		} else if(routes[i].innerHTML == "Route 2") {
			routes[i].addEventListener("click", function() {

				routePoints = [ [342.5,252], [272.5,146], [166.5,222], [198.5,272], [92.5,346], [128.5,400], [340.5,252], [342.5,252]];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				drawRoute();
				populateCoordinateHTMLList();

			});
		} else if(routes[i].innerHTML == "Route 3") {
			routes[i].addEventListener("click", function() {

				routePoints = [ [270.5,372], [372.5,296], [308.5,196], [198.5,272], [166.5,224], [58.5,298], [130.5,400], [238.5,324], [270.5,372] ];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				drawRoute();
				populateCoordinateHTMLList();

			});
		} else if(routes[i].innerHTML == "Route 4") {
			routes[i].addEventListener("click", function() {

				routePoints = [ [60.5,78], [20.5,106], [52.5,152], [0.5,194], [0.5,208], [56.5,296], [272.5,148], [202.5,48], [94.5,122], [62.5,80], [60.5,78] ];
				context.drawImage(base_image, 0, 0, 373, 414);
				pointOne = null;
				pointTwo = null;
				drawRoute();
				populateCoordinateHTMLList();
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
			populateCoordinateHTMLList();
		});

	document.getElementById("complete-route").addEventListener("click", function() {
		var len = routePoints.length;
		if (len > 2) {
			if (routePoints[0][0] != routePoints[len - 1][0] || routePoints[0][1] != routePoints[len - 1][1]) {
				context.lineTo(routePoints[0][0], routePoints[0][1]);
				context.stroke();
				routePoints.push(routePoints[0]);
			}
		}
		populateCoordinateHTMLList();
	});

};

function drawRoute() {
	var len = routePoints.length;
	context.drawImage(base_image, 0, 0, 373, 414);

	if (len > 0) {
		context.beginPath();
		context.strokeStyle = '#0000FF';
		context.lineWidth = 3;
		context.moveTo(routePoints[0][0], routePoints[0][1]);
		for (var i = 1; i < len; i++) {
			context.lineTo(routePoints[i][0], routePoints[i][1]);
		}
		context.stroke();
	}
}

function populateCoordinateHTMLList	() {
	var ol = document.getElementById("route-coordinates");
	var li;
	var deleteButton;
	var span;
	var stringArray;
	var newX;
	var newY;


	$('ol').empty();

	if (routePoints.length == 0) {
		ol.innerHTML = "No Coordinates Available";
	} else {
		for(var i = 0; i < routePoints.length; i++) {
			li = document.createElement("li");

			span = document.createElement("span");
			span.innerHTML = "x = " + routePoints[i][0] + ", y = " + routePoints[i][1];
			span.addEventListener("click", function () {
				this.contentEditable = true;
			});

			span.addEventListener("blur", function(index) {
				return function () {
					stringArray = this.innerHTML.split(",");
					if (stringArray.length != 2) {
						alert("Ensure there is only one comma in the coordinates textbox.");
					} else {
						newX = parseFloat(stringArray[0].replace(/[^\d.-]/g, ''));

						newY = parseFloat(stringArray[1].replace(/[^\d.-]/g, ''));
						if (isNaN(newX)|| isNaN(newY)) {
							alert("Failed to parse properly, ensure there is only one comma in the coordinates textbox.");
							this.innerHTML = "x = " + routePoints[index][0] + ", y = " + routePoints[index][1];
						} else {
							routePoints[index][0] = newX;
							routePoints[index][1] = newY;
							drawRoute();
						}

					}

				};
			}(i));

			deleteButton = document.createElement("button");
			deleteButton.innerHTML = "X";

			deleteButton.addEventListener("click", function(index) {
				return function () {
					routePoints.splice(index, 1);
					drawRoute();
					populateCoordinateHTMLList();
				};
			}(i));

			li.appendChild(span);
			li.appendChild(deleteButton);
			ol.appendChild(li);

		}
	}

};
