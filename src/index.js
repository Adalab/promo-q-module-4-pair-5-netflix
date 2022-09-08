const express = require('express');
const cors = require('cors');
const movieList = require('./data/movies.json');
const Database = require('better-sqlite3');
const db = new Database('./src/database/database.db', { verbose: console.log });

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get("/movies", (req, resp) => {
  const query = Database.prepare(`SELECT * FROM movies`)
  const allMovies = query.all;
  console.log(allMovies)
  const gender = req.query.gender ? req.query.gender : "";
  const moviesFilter = allMovies.filter((movie) => movie.gender.includes(gender));
  resp.json({
    "success": true,
    "movies": moviesFilter,

  });

});








//motor de plantillas 

server.set("view engine", "ejs");
server.get('/movie/:movieId', (req, res) => {


  const movieFound = movieList.find((movie) => movie.id === req.params.movieId)


  res.render('movie', movieFound)


});







const staticServer = './src/public-react';
server.use(express.static(staticServer));
const staticServerImg = './src/public-movies-images'
server.use(express.static(staticServerImg));
server.use(express.static('./src/styles'));
