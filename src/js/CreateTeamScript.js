window.onload = function () {
	document.getElementById("submit-button-href").parentNode.addEventListener("click", function() {
		var nameTextBox = document.getElementById("team-name");
		console.log(nameTextBox.value);
		
		var errorLabel = document.getElementById("error-message");
		if(nameTextBox.value == "") {
			console.log("asdjfihadsflkjsadflk");
			errorLabel.innerHTML = "Please Fill in Team Name";
			console.log(errorLabel.parentNode);
			errorLabel.parentNode.classList.add("bg-danger");
		} else {
			errorLabel.innerHTML = "";
			errorLabel.parentNode.classList.remove("bg-danger");
			window.location.replace("LajosIndex.html");
		}
	});
}