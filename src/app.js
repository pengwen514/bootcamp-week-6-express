const express = require('express');
const app = express();
const User = require('./models/user.js');

app.use(express.json());

app.get('/users', async (request, response) => {
  //response.send(`This is a ${request.method} method`)
  const users = await User.findAll();
  response.send(users)
})

app.post('/users', async (req, res, next) => {
  try{
    const user = await User.create(req.body)
    res.send(user.username)
  } catch (error) {
    next(error);
  }
})

app.get('/users/:username', async (req, res, next) => {
  try{
    const user = await User.findOne({
      where: {username: req.params.username}
    })
    res.send(user);
  }
  catch(error){
    next(error)
  }
})

module.exports = app;