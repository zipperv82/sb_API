const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const id = require('./controllers/id');




const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'zipperv82',
    password : 'lovehate01',
    database : 'smart-brain'
  }
});


const app = express();



app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => { res.send('it is working!') })

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { id.handleId(req, res, db) })

app.put('/image', (req, res) => {image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res) })



app.listen(3001, ()=>{
	console.log('app is running on port 3001');
})

