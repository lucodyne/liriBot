require("dotenv").config();
const axios = require("axios");
const Spotify = require("node-spotify-api");
const keys = require("./keys");
const spotify = new Spotify(keys.spotifyKey);
const moment = require("moment");

const [, , , ...args] = process.argv;
const searchString = args.join(" ");
if (!process.argv[2]) {
  return console.log(`How can I help you?`);
}
if (process.argv[2] == "omdb") {
  if (searchString) {
    axios
      .get(
        `http://www.omdbapi.com/?t=${searchString}&y=&plot=short&apikey=${keys.omdbKey.key}`
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
    spotify.search({ type: "track", query: searchString, limit: 5 }, function(
      error,
      data
    ) {
      if (error) {
        return console.log("Error occurred: " + error);
      }
      data.tracks.items.forEach(element => {
        console.log(`***********************`);
        console.log(`Song title: ${element.name}`);
        const artistsArray = [];
        element.artists.forEach(artist => {
          artistsArray.push(artist.name);
        });
        console.log(`Artist(s): ${artistsArray.join(", ")}`);
        if (element.preview_url) {
          console.log(`Preview: ${element.preview_url}`);
        }
        console.log(`Album: ${element.album.name}`);
      });
    });
  } else {
    console.log(`What song would you like to know about?`);
  }
} else if (process.argv[2] == "seatgeek") {
  if (searchString) {
    axios
      .get(
        `https://api.seatgeek.com/2/events?performers.slug=${searchString}&client_id=${keys.seatGeekKey.client_id}`
      )
      .then(function(response) {
        if (response.data.events[0]) {
          response.data.events.forEach(element => {
            console.log(`***********************`);
            console.log(`Venue: ${element.venue.name}`);
            console.log(`Location: ${element.venue.display_location}`);
            console.log(moment(element.datetime_local).format("DD/MMM/YYYY"));
          });
        } else {
          console.log(`Sorry, I couldn't find anything.`);
        }
      })
      .catch(function(error) {
        if (error) {
          console.log(error);
        }
      });
  } else {
    console.log(`Enter an artist to search for concerts.`);
  }
} else {
  console.log(
    `I couldn't find that. Search with "omdb", "spotify", or "seatgeek".`
  );
}
