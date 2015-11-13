window.onload = function () {
	document.getElementById("submit-button-href").parentNode.addEventListener("click", function() {
		var nameTextBox = document.getElementById("username");
		console.log(username.value);
		var nameTextBox = document.getElementById("password");
		console.log(password.value);
		
		var errorLabel = document.getElementById("error-message");
		if(nameTextBox.value != "USERNAME" && nameTextBox.value != "PASSWORD") {
			console.log("Admins sucks at logging in.");
			errorLabel.innerHTML = "Incorrect username and/or password.";
			console.log(errorLabel.parentNode);
			errorLabel.parentNode.classList.add("bg-danger");
		} else {
			errorLabel.innerHTML = "";
			errorLabel.parentNode.classList.remove("bg-danger");
			window.location.replace("index.html");
		}
	});
}