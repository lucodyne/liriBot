const dotenv = require("dotenv");
const axios = require("axios");
const spotify = require("node-spotify-api");
const keys = require("./keys");

const [, , , ...args] = process.argv;
const searchString = args.join(" ");
if (!process.argv[2]) {
  return console.log(`How can I help you?`);
}
if (process.argv[2] == "omdb") {
  if (searchString) {
    axios
      .get(
        `http://www.omdbapi.com/?t=${searchString}&y=&plot=short&apikey=trilogy`
      )
      .then(function(response) {
        const movieInfo = [
          "Title",
          "Year",
          "IMDB Rating",
          "Country",
          "Language",
          "Plot",
          "Actors"
        ];
        movieInfo.forEach(element => {
          if (element === "IMDB Rating") {
            if (response.data.Ratings[0].Value) {
              console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            }
          } else if (response.data[element]) {
            console.log(`${element}: ${response.data[element]}`);
          }
        });
      })
      .catch(function(error) {
        if (error) {
          console.log(error);
        }
      });
  } else {
    console.log(`What movie would you like to know about?`);
  }
} else if (process.argv[2] == "spotify") {
  if (searchString) {
    spotify.search({ type: "track", query: searchString }, function(
      error,
      data
    ) {
      if (error) {
        return console.log("Error occurred: " + error);
      }
      console.log(data);
    });
  } else {
    console.log(`What song would you like to know about?`);
  }
}
