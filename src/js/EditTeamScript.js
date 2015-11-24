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

	for (var i = 0; i < deleteButtons.length; i++) {
		console.log(deleteButtons[i]);
		deleteButtons[i].addEventListener("click", function(e){
			e.preventDefault();
			this.parentNode.parentNode.parentNode.remove();
		});
	};

	var teams = document.getElementsByClassName("teams");
	var teamName = document.getElementById("team-name");
	var email1 = document.getElementById("email-textbox1");
	var email2 = document.getElementById("email-textbox2");
	var email3 = document.getElementById("email-textbox3");
	var email4 = document.getElementById("email-textbox4");

	for(var i = 0; i < teams.length; i++) {
		console.log(teams[i].innerHTML);
		if(teams[i].id == "TeamOne") {
			teams[i].addEventListener("click", function() {
				teamName.value = "Food Fighters"
				email1.value = "Lorant@gmail.com"
				email2.value = "Lajos@gmail.com"
				email3.value = "Christian@gmail.com"
				email4.value = "Nigel@gmail.com"
			});
		} else if(teams[i].id == "TeamTwo") {
			teams[i].addEventListener("click", function() {
				teamName.value = "United Food Security"
				email1.value = "Elliot@gmail.com"
				email2.value = "John@gmail.com"
				email3.value = "BobTheDog@gmail.com"
				email4.value = "Matt@gmail.com"
			});
		} else if(teams[i].id == "TeamThree") {
			teams[i].addEventListener("click", function() {
				teamName.value = "FoodFTW"
				email1.value = "IHeartFood@gmail.com"
				email2.value = "tehPwnerer@gmail.com"
				email3.value = "Metallica1@gmail.com"
				email4.value = "Compcsi@gmail.com"
			});
		} else if(teams[i].id == "TeamFour") {
			teams[i].addEventListener("click", function() {
				teamName.value = "Thunder Cats"
				email1.value = "avengers@gmail.com"
				email2.value = "KidRock@gmail.com"
				email3.value = "JoeMama@gmail.com"
				email4.value = "DanGils@gmail.com"
			});
		}
	}
};
