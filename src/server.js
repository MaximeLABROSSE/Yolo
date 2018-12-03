const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');
//const Sequelize = require('sequelize');
//const Sequelize = new Sequelize('maxime','root','',
//{
//	host: 'localhost',
//	dialect: 'mysql',
	
//}


// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

// Get all the users defined
app.get('/', function (req, res) {
  models.User.findAll()
    .then((users) => {
      res.json(users)
    })
})

// Add a new user to the database
app.post('/', function(req, res) {
  models.User.create({
    username: req.body.username
  })
    .then(() => {
      res.send('User added !')
    })
})



//POUR LES GRIMELINS !!!!!!!!!!!!!


//update
app.put('/grimins/:id', function(req, res) {
	const id = parseInt(req.params.id)
	 models.Grim.update(
	 {pseudo: req.body.pseudo},
		 {where: { id: id }}
	 )

    .then(() => {
      res.send(' grimins update !')
    })
})


//Add a new user to the database
app.post('/grimins', function(req, res) {
  models.Grim.create({
    username: req.body.username,
	pseudo: req.body.pseudo,
	age: req.body.age
	
  })
    .then(() => {
      res.send('add grimins !')
    })
})









//

// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
  app.listen(process.env.PORT, function() {
    console.log('Express server listening on port 8080');
  });
});
