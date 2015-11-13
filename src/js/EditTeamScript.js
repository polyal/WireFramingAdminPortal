window.onload = function () {
	document.getElementById("submit-button").addEventListener("click", function() {
		var nameTextBox = document.getElementById("team-name");
		console.log(nameTextBox.value);

		var errorLabel = document.getElementById("error-message");
		if(nameTextBox.value == "") {
			errorLabel.innerHTML = "Please Fill in Team Name";
			errorLabel.parentNode.classList.add("bg-danger");
		} else {
			errorLabel.innerHTML = "";
			errorLabel.parentNode.classList.remove("bg-danger");
			window.location.replace("index.html");
		}
	});

	var deleteButtons = document.getElementsByClassName("delete-button");
	console.log("fbdajbj");
	for (var i = 0; i < deleteButtons.length; i++) {
		console.log(deleteButtons[i]);
		deleteButtons[i].addEventListener("click", function(e){
			e.preventDefault();
			this.parentNode.parentNode.parentNode.remove();
			console.log("stuffs");
		});
	};
};
