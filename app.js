// MVP:
//
// Query user input to determine which word to search
// Error handling for missing words
// Fetch dictionary and thesaurus APIs from Merriam-Webster website
// Access definition and synonyms from JSON object
// Populate the results section with definition and synonyms
//
// Stretch Goals:
//
// Add an image of word searched from appropriate API
// Create small scrolling gallery of available images
// Offer audible definition when available

const app = {};

// getting the results from the API Call

app.getDesiredWord = function () {
	// Selecting the form element
	app.form = document.querySelector("form");

	// Adding the event listener to the submit button
	app.form.addEventListener("submit", function (event) {
		event.preventDefault();
		app.desiredWord = document.getElementById("search").value;
		console.log(app.desiredWord);
		app.getResult();
	});
};

app.getResult = function () {
	app.dictKey = "a9cac565-bc55-4024-9e9a-7f276804fe69";
	app.dictURL = new URL(
		`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${app.desiredWord}?key=${app.dictKey}`
	);

	app.thesaurusKey = "fb667759-bffa-458e-99cc-52ad3a241442";
	app.thesaurusURL = new URL(
		`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${app.desiredWord}?key=${app.thesaurusKey}`
	);

	fetch(app.dictURL)
		.then(function (res) {
			return res.json();
		})
		.then(function (jsonResult) {
			app.definitions = jsonResult;
			console.log(app.definitions);
			// console.log(app.definitions);
			// calling the display function
			// app.displayResult(app.definitions);

			// Error handling if word cannot be found (meta == undefined)
			// if (jsonResult.meta === undefined) {
			// 	alert("Unable to find that word. Check your spelling!");
			// }
		})
		.then(function () {
			fetch(app.thesaurusURL)
				.then(function (res) {
					return res.json();
				})
				.then(function (jsonResult) {
					// console.log(jsonResult);
					// app.definitions = jsonResult[0].shortdef;
					// console.log(app.definitions);
					app.synonyms = jsonResult[0].meta.syns[0];
					console.log(app.synonyms);
					app.displayResult(app.definitions, app.synonyms);
				});
		});
};

// Displaying the resullts on the page

app.displayResult = function (definitionArray, synonymsArray) {
	// Creating an array with the definitions of the word to display to screen
	const resultsList = document.querySelector(".resultsList");
	resultsList.innerHTML = "";

	// definitionsArray.forEach(function (definitionObj) {
	// 	// console.log(definitionArray);
	// 	const liEl = document.createElement("li");
	// 	console.log(liEl);
	// 	liEl.appendChild(definitionObj);
	// 	definitionsList.appendChild(liEl);
	// });

	for (let i = 0; i < definitionArray.length; i++) {
		let liEl = document.createElement("li");
		liEl.innerHTML = `${definitionArray[i].shortdef}`;
		resultsList.appendChild(liEl);
	}

	for (let i = 0; i < synonymsArray.length; i++) {
		let liEl = document.createElement("li");
		liEl.innerHTML = `${synonymsArray[i]}`;
		resultsList.appendChild(liEl);
	}
};

// Kicking off
app.init = function () {
	// calling the get result
	app.getDesiredWord();
};

// Calling init function
app.init();
