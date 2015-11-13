window.onload = function () {
	document.getElementById("submit-button-href").parentNode.addEventListener("click", function() {
		var nameTextBox = document.getElementById("team-name");
		var captainEmailBox = document.getElementById("captain-email");

		var errorLabel = document.getElementById("team-name-error-message");
		var captainErrorLabel = document.getElementById("team-captain-error-message");

		if(nameTextBox.value == "") {
			errorLabel.innerHTML = "Please enter the team name";
			errorLabel.parentNode.classList.add("bg-danger");
		} else {
			errorLabel.innerHTML = "";
			errorLabel.parentNode.classList.remove("bg-danger");
		}

		if (captainEmailBox.value == "") {
			captainErrorLabel.innerHTML = "Please enter the team captain's email address";
			captainEmailBox.parentNode.classList.add("bg-danger");
		} else {
			captainErrorLabel.innerHTML = "";
			captainEmailBox.parentNode.classList.remove("bg-danger");
		}

		if (nameTextBox.value != "" && captainEmailBox.value != "") {
			window.location.replace("index.html");
		}
	});
}; /*79 Roehampton Crescent*/