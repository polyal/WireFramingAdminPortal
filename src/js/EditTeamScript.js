//Will hold an array of objects with two properties, a "remove" property and a "team" property that will hold the object returned from the database.
//If "remove" is true upon submit being clicked, DELETE requests will be passed to the server.
var teamsArray;

//The index of selected team in the list. 0 based, -1 means no teams are available.
var selectedTeamIndex = -1;

/*
 * Populates the global teamsArray variable using the getTeamsFromDB function and then gives each a "remove" property of false.
 */
function populateTeamsArray() {
	var tempArray = getTeamsFromDB();

	teamsArray = [];

	for (team in tempArray) {
		teamsArray.push({
			"remove" : false,
			"team" : team
		});
	}
};

/*
 * Returns an array of team objects from the database.
 */
function getTeamsFromDB() {
	var apiURL;

	var teamsResponse;

	apiURL = getApiURL('team');
	$.ajax ({
			type : 'GET',
			url : apiURL,
			dataType : 'json',

			xhrFields: {
				withCredentials: true
		  	},

			error : function(a, b, c){
				console.log("Unable to retrieve teams from the database.");
			  	console.log(a);
			  	console.log(b);
			  	console.log(c);
		  	},

		  	success : function(data){
	  			teamsResponse = data;
	  			console.log(teamsResponse);
		  	}
		}).then(function() {
			return teamsResponse;
		});

};

/*
 * Sets the HTML of EditTeam.html to contain the teams from the database. Uses the teamArray variable and ignores any teams with the "remove" property set to true.
 */
function populateHTMLofTeams() {
	var TeamListDiv = document.getElementById("TeamList");

	var strHTML = "";

	var bit = 0;

	var teamCount = 0;

	var team;

	for (teamObject in teamsArray) {
		if (!teamObject.remove) {
			team = teamObject.team;
			teamCount++;
			if (bit == 0) {
				strHTML.append('<div class="row"><div class="col-md-12"><p class="bg-info teams" id="Team' + teamCount + '"><button class="btn btn-warning delete-team" id="DeleteTeam' + teamCount + '">Delete?</button>' + team.name + '</p></div></div>');
			} else {
				strHTML.append('<div class="row"><div class="col-md-12"><p class="bg-warning teams" id="Team' + teamCount + '"><button class="btn btn-warning delete-team"  id="DeleteTeam' + teamCount + '">Delete?</button>' + team.name + '</p></div></div>');
			}
			bit++;
			bit %= 2;
		}
	}

	addDeleteTeamButtonEventListeners();
};

/*
 * Deletes the team with the id specified from the database. This is a permanent deletion.
 */
function deleteTeamFromDB(id) {

	if (typeof id !== number) {
		console.log("Must pass a number to deleteTeamFromDB.");
		return false;
	}
	var success;

	var apiURL;

	apiURL = getApiURL('team', id);

	$.ajax ({
		type : 'DELETE',
		url : apiURL,

		xhrFields: {
			withCredentials: true
	  	},

		error : function(a, b, c){
			console.log("Unable to delete the team with id=" + id + " from the database.");
		  	console.log(a);
		  	console.log(b);
		  	console.log(c);
		  	success = false;
	  	},

	  	success : function(data){
	  		success = true;
  			console.log(data);
	  	}

	}).then( function() {
		return success;
	});
}

/*
 * Adds event listeners to the buttons added from the populateHTMLofTeams function.
 */
function addDeleteTeamButtonEventListeners() {
	var teamsArray;

	var teamCount;


	teamsArray = getTeamsFromDB();

	if (teamsArray.length != 0) {
		//Add delete methods to each of the buttons just added to the html

		teamCount = 0;
		for (teamObject in teamsArray) {
			if (!teamObject.remove) {
				teamCount++;
				document.getElementbyId("Team" + teamCount).addEventListener("click", function() {
					if (window.confirm("Are you sure you'd like to remove the " + teamsArray[teamCount - 1].name + " team?")) {
						teamsArray[teamCount - 1].remove = true;
						populateHTMLofTeams();
						addDeleteTeamButtonEventListeners();
					}
				});
			}
		} /* end of for loop of teams in teamsArray */
	}
};

/*
 * A simple method to call that would populate the entire form, to be called when a different team is selected.
 */
function populateFormInformation() {
	var team = teamsArray[selectedTeamIndex].team;

	//Set the team name
	var teamNameField = document.getElementById("team-name");

	teamNameField.innerHTML = team.name;

	//Set the team privacy
	var teamPrivacyField = document.getElementById("team-type");

	var elements = document.getElementsByName("team-type");

	if (team.type == 0) {
		for (var i = 0; i < elements.length; i++)
		{
		    if (elements[i].value == "Public")
		    {
		        elements[i].checked = true;
		    }
		}
	} else if (team.type == 1) {
		for (var i = 0; i < elements.length; i++)
		{
		    if (elements[i].value == "Private")
		    {
		        elements[i].checked = true;
		    }
		}
	} else {
		console.log("Team with id " + team.id + " has an illegal type set. Check the data.");
	}

	//Populate the 'Current Team Members' fields

	//Populate the 'Invite Team Members' fields

	//Populate the 'Route Selection' fields
};



window.onload = function () {
	/* populate the team list */
	populateTeamsArray();
	populateHTMLofTeams();

	alert("Finished adding teams to the HTML.");
	return;

	/* populate data form */

	/* attach functions to the buttons */
	document.getElementById("submit-button").addEventListener("click", function() {

		var nameTextBox = document.getElementById("team-name");
		console.log(nameTextBox.value);

		var errorLabel = document.getElementById("error-message");
		if(nameTextBox.value == "") {
			errorLabel.innerHTML = "Please Fill in Team Name";
			errorLabel.parentNode.classList.add("bg-danger");
			return;
		} else {
			errorLabel.innerHTML = "";
			errorLabel.parentNode.classList.remove("bg-danger");
			window.location.replace("index.html");
		}

		if (window.confirm("Are you sure you'd like to update the information of all the teams listed above?")) {
			/* cycle through all the teams in the team array, updating the information */
			for (teamObject in teamsArray) {
				if (teamObject.remove) {
					if (!deleteTeamFromDB(teamObject.team.id)) {
						console.log("There was an issue deleting the team with id " + teamObject.team.id);
					}
				} else {

				}
			}
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


var getApiURL = function (entityName, identifier) {
	if (typeof entityName !== 'string') {
		return;
	}

	if (typeof identifier === 'undefined') {
		switch (entityName.toLowerCase()) {
			case 'team':
				return "http://131.104.49.63/api/team/";
			case 'participant':
				return "http://131.104.49.63/api/participants/";
			case 'route':
				return "http://131.104.49.63/api/route/";
			case 'waiver':
				return "http://131.104.49.63/api/waiver/";
			case 'faq':
				return "http://131.104.49.63/api/faq/";
			case 'agency':
				return "http://131.104.49.63/api/agency/";
			default:
				console.log("An incorrect entity name was passed into the getApiURL function. The entity name was " + entityName.toLowerCase());
				break;
		}
	} else {
		switch (entityName.toLowerCase()) {
			case 'team':
				return "http://131.104.49.63/api/team/" + identifier;
			case 'participant':
				if (typeof identifier === 'number') {
					return "http://131.104.49.63/api/participants/" + identifier;
				} else {
					return "http://131.104.49.63/api/participants/email/" + identifier;
				}
			case 'route':
				return "http://131.104.49.63/api/route/" + identifier;
			case 'waiver':
				return "http://131.104.49.63/api/waiver/" + identifier;
			case 'faq':
				return "http://131.104.49.63/api/faq/" + identifier;
			case 'agency':
				return "http://131.104.49.63/api/agency/" + identifier;
			default:
				console.log("An incorrect entity name was passed into the getApiURL function. The entity name was " + entityName.toLowerCase());
				break;
		}
	}
};