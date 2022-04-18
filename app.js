// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
const mongoose = require('mongoose');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

const movies = require('./models/Movie.model')

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'Ironhack Cinema';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title =  projectName;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

app.get('/movies', function(req, res, next){
    movies.find()
    .then(function (results) {
        console.log("success!", results); 
        res.render("movies", {movies: results});
    })
    .catch(function(err){
        console.log("something went wrong", err.message);
    })

});

app.get('/movies/:movieId', function (req, res, next){
    movies.findById(req.params.movieId)
    .then(function(SeeMovie){
        console.log("success!", seeMovie);
        res.render("seeMovie", {seeMovie: seeMovie})
    })
    .catch(function(error){
        res.json(error);
    })
})



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

mongoose
  .connect("mongodb://localhost/movies")
  .then((x)=>
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err)=> console.error("Error connecting to mongo", err));

module.exports = app;
