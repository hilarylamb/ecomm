// require in express which is a library for popular frameworks
const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

// app is an object that describes all the different things our web server can do
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// route handler this is going to tell our web server exactly what to do when it recieves a network request coming from our browser
// first arguement stands for request, an object that represents the incoming request from our browser into our web server
// second arguemnt res is short for response, it represent the outgoing response from our server back over to our browser
//  any tiem someone makes a network request to the root route of my application we want to run this call back function, when that call back function runs we're going to take the string 'hi there' and send it back to whoever has made the requst to us
app.get('/', (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <input name="passwordConfirmation" placeholder="password confirmation"/>
            <button>Sign Up</button>
        </form>
    </div>
  `);
});

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }

  res.send('Account Created!!!');
});

// tell my application to start listening to incoming network traffic on a particular port on our machine
app.listen(3000, () => {
  console.log('Listening');
});
