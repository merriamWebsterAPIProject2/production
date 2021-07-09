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

app.desiredWord = "child";

app.dictKey = "a9cac565-bc55-4024-9e9a-7f276804fe69";
app.dictURL = new URL(
	`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${app.desiredWord}?key=${app.dictKey}`
);

app.thesaurusKey = "fb667759-bffa-458e-99cc-52ad3a241442";
app.thesaurusURL = new URL(
	`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${app.desiredWord}?key=${app.thesaurusKey}`
);

app.dictionaryAPI = function () {
	fetch(app.dictURL)
		.then(function (res) {
			return res.json();
		})
		.then(function (jsonResult) {
			console.log(jsonResult);
		});
};

app.thesaurusAPI = function () {
	fetch(app.thesaurusURL)
		.then(function (res) {
			return res.json();
		})
		.then(function (jsonResult) {
			console.log(jsonResult);
			app.synonyms = jsonResult[0].meta.syns;
			console.log(app.synonyms);
		});
};

app.init = function () {
	app.desiredWord;
	app.dictionaryAPI();
	app.thesaurusAPI();
};

app.init();
