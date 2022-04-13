let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let mongoose = require('./config/connection');
let Movie = require('./models/movies');
let User = require('./models/users');
let cors = require('cors');
const { any } = require('webidl-conversions');
app.use(
    bodyParser.json({
        limit:'20mb',
    })
)
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
  }));

app.use(
    bodyParser.urlencoded({
        limit:'20mb',
        extended: true,
    })
)
app.get('/', cors(), (req, res, next) => {
    Movie.find((err, movies) => {
      console.log(movies);
      res.send(movies)
    });
  });

  app.get('/movie/:id', (req, res, next) => {
    Movie.findById(req.params.id, (err, movie)=>{
      if (err) throw err
      console.log(movie)
      res.send(movie)
    });
    
  });

app.get('/login/', (req, res, next) =>{
    const username = req.query.username;
    const password = req.query.password;
    console.log(req.query)
    User.exists({ username, password}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          if(result){
            res.send({exist: true})
          } else{
            res.send({exist: false})
          }
        } 
})});
app.post('/movie/new/', cors(), (req, res, next) => {
    console.log(req.body)
    let movie = new Movie({
        title:req.body.title,
        overview:req.body.overview,
        poster:req.body.poster,
        video:req.body.video,
        actors: req.body.actors,
        director: req.body.director,
        rate: req.body.rate,
        year: req.body.year
    })
    movie.save()
    res.send(movie)
  });
  
app.post('/movie/update/:id', cors(), (req, res, next) => {
    console.log(req.body)
    let idmovie = req.params.id;
    Movie.findByIdAndUpdate(idmovie, {$set:req.body}, { new: true }, (err, model) => {
        if (err) throw err;
      });
    //console.log(movie);
    res.redirect("/");
  });
  
app.get('/movie/delete/:id', cors(), (req, res, next) => {
    let idMovie = req.params.id;
    Movie.remove({_id: idMovie }, (err) => {
      if (err) throw err;
      //o llamar nuevamente a find() y res.render();
      res.redirect('/');
    });
  });

app.listen(4040, () => {
    console.log('Listening in port 4040');
})
  
