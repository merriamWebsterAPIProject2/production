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

// const app = {};

// app.desiredWord = "house";
// app.dictKey = "a9cac565-bc55-4024-9e9a-7f276804fe69";
// app.dictURL = new URL(
//   `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${app.desiredWord}?key=${app.dictKey}`
// );

// app.thesaurusKey = "fb667759-bffa-458e-99cc-52ad3a241442";
// app.thesaurusURL = new URL(
//   `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${app.desiredWord}?key=${app.thesaurusKey}`
// );

// fetch(app.dictURL)
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (jsonResult) {
//     console.log(jsonResult);
//   });

// fetch(app.thesaurusURL)
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (jsonResult) {
//     console.log(jsonResult);
//   });

const app = {};

// getting the results from the API Call

app.getResult = function () {
  app.desiredWord = "house";

  app.thesaurusKey = "fb667759-bffa-458e-99cc-52ad3a241442";
  app.thesaurusURL = new URL(
    `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${app.desiredWord}?key=${app.thesaurusKey}`
  );

  fetch(app.thesaurusURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (jsonResult) {
      app.definitions = jsonResult[0].shortdef;
      //   console.log(app.definitions);
      app.synonyms = jsonResult[0].meta.syns;
      console.log(app.synonyms);

      // calling the display function
      app.displayResult(app.definitions);
    });
};

// Displaying the resullts on the page

app.displayResult = function (definations) {
  // Selecting the form
  app.form = document.querySelector("form");
  // Adding the event listenet to the submit button
  app.form.addEventListener("submit", function (event) {
    // preventing the form to get refresh
    event.preventDefault();
    // app.desiredWord = document.querySelector("input[type=text").value;

    console.log("Button clicked");
    // creating the filing the defination

    definations.forEach(function (definationArray) {
      console.log(definationArray);
    });
  });
};

// Kicking off
app.init = function () {
  // calling the get result
  app.getResult();
};

// Calling init function
app.init();
