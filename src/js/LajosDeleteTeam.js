
window.onload = function(){
	document.getElementById("delete-button").addEventListener("click", function(){

		var checkboxes = document.getElementsByName("team-names");
		var boxesChecked = [];

		for (var i = 0; i < checkboxes.length; i++) {
		     if (checkboxes[i].checked) {
		        boxesChecked.push(checkboxes[i]);
		    }
		}

		//remove the components corresponding to each checked box
		for (var i = 0; i < boxesChecked.length; i++){
			boxesChecked[i].parentNode.parentNode.remove();
		}
	});
};