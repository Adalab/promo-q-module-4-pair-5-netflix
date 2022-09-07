const express = require('express');
const cors = require('cors');
const movieList = require('./data/movies.json')

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
  console.log(movieList)
  resp.json({
    "success": true,
    "movies": movieList,

  });

});


//motor de plantillas 

server.set("view engine", "ejs");
server.get('/movie/:movieId', (req,res)=>{
  console.log(req.params.movieId)

  const movieFound = movieList.find((movie)=> movie.id=== req.params.movieId)
  console.log(movieFound)
  
   res.render('movie')
 
  
});







const staticServer = './src/public-react';
server.use(express.static(staticServer));
