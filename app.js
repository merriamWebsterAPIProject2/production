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
			if (jsonResult[0].meta === undefined) {
				alert("Unable to find that word. Check your spelling!");
			}
			app.definitions = [];
			for (let i = 0; i < jsonResult.length; i++) {
				// Regular expression (RegExp) search to capture appropriate defitinitons using target meta.id with ":" followed by any digit from 0-9

				// Example: this returns the first 2 entries from the array of definitions for the word "world" but ignores any other definitions in the array that contain "world" in the meta.id
				app.regexSearch = new RegExp(`${app.desiredWord}:\d*?`);

				// If there exists a word with more than one definition of the literal match of the word itself, return all those definitions (Example: "fly")
				if (jsonResult[i].meta.id.match(app.regexSearch)) {
					app.definitions.push(jsonResult[i]);
				}

				// Else, return the sole definition (Example: "apple")
				else if (jsonResult[i].meta.id === app.desiredWord) {
					app.definitions.push(jsonResult[i]);
				}
			}
			console.log(app.definitions);
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
					app.synonyms = [];

					// Error handling for words that return array with similarly spelled words instead of literal synonyms
					if (typeof jsonResult[0] == "string") {
						app.synonyms.push(
							`${capitalize(
								app.desiredWord
							)} has no known synonyms to display.`
						);
					} else {
						for (let i = 0; i < jsonResult.length; i++) {
							// Regular expression (RegExp) search to capture appropriate defitinitons using target meta.id with ":" followed by any digit from 0-9

							if (jsonResult[i].meta.id.match(app.regexSearch)) {
								app.synonyms.push(jsonResult);
							} else if (
								jsonResult[i].meta.id === app.desiredWord
							) {
								app.synonyms.push(jsonResult[i].shortdef[0]);
							}
						}

						// Error handling for words with no relevant synonyms
						if (app.synonyms.length === 0) {
							app.synonyms.push(
								`${capitalize(
									app.desiredWord
								)} has no known synonyms to display.`
							);
						}
						console.log(app.synonyms);
					}
					app.displayResult(app.definitions, app.synonyms);
				});
		});
};

// Displaying the resullts on the page
app.displayResult = function (definitionArray, synonymsArray) {
	// Creating an array with the definitions of the word to display to screen
	const resultsList = document.querySelector(".resultsList");
	resultsList.innerHTML = "";

	for (let i = 0; i < definitionArray.length; i++) {
		let liEl = document.createElement("li");
		liEl.innerHTML = `${definitionArray[i].shortdef}`;
		resultsList.appendChild(liEl);
	}
	// Add line break between definitions and synonyms

	for (let i = 0; i < synonymsArray.length; i++) {
		let liEl = document.createElement("li");
		liEl.innerHTML = `${synonymsArray[i]}`;
		resultsList.appendChild(liEl);
	}
};

// Helper Functions

// To capitalize strings
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Kicking off
app.init = function () {
	// calling the get result
	app.getDesiredWord();
};

// Calling init function
app.init();
