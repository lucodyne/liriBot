console.log("Keys loaded.");

exports.spotifyKey = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.omdbKey = {
  key: process.env.OMDB_KEY
};
