require("dotenv").config()
exports.spotifyKey = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
};
console.log(process.env.SPOTIFY_ID)
exports.omdbKey = {
  key: process.env.OMDB_KEY
};
