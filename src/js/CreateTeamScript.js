// Team Type Enum - 0 is public, 1 is private

window.onload = function () {
	document.getElementById("submit-button-href").parentNode.addEventListener("click", function() {
		var nameTextBox = document.getElementById("team-name");
		var captainEmailBox = document.getElementById("captain-email");

		var errorLabel = document.getElementById("team-name-error-message");
		var captainErrorLabel = document.getElementById("team-captain-error-message");

		var sendRequest = true;

		/* Get which radio button is checked */
		var radioButtons = document.getElementById("team-type");


		if(nameTextBox.value == "") {
			errorLabel.innerHTML = "Please enter the team name";
			errorLabel.parentNode.classList.add("bg-danger");
			sendRequest = false;
		} else {
			errorLabel.innerHTML = "";
			errorLabel.parentNode.classList.remove("bg-danger");
		}

		if (captainEmailBox.value == "") {
			captainErrorLabel.innerHTML = "Please enter the team captain's email address";
			captainEmailBox.parentNode.classList.add("bg-danger");
			sendRequest = false;
		} else {
			captainErrorLabel.innerHTML = "";
			captainEmailBox.parentNode.classList.remove("bg-danger");
		}

		/*if (nameTextBox.value != "" && captainEmailBox.value != "") {
			window.location.replace("index.html");
		}*/

		var newTeamJson = {
			"name" : nameTextBox.value,
			"type" : 0,
			"capId" : 40000,
			"eventId" : 1
		};

		$.ajax ({
		  type : 'POST',
		  url : 'http://131.104.49.63/api/team/',
		  data : newTeamJson
		});
	});
}; /*79 Roehampton Crescent*/


