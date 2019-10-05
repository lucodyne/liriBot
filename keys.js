require("dotenv").config();
exports.spotifyKey = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdbKey = {
  key: process.env.OMDB_KEY
};

exports.seatGeekKey = {
  client_id: process.env.SEATGEEK_ID,
  secret: process.env.SEATGEEK_SECRET
};
