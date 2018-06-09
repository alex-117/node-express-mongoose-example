const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  // Get all users from the User model
  app.get('/api/get-users', async (req, res) => {
    const users = await User.find({}, (err, user) => {
      if (err) return err;
      return user;
    });
    res.send(users);
  });

  // Search specific user(s) by name from User model using name
  app.get('/api/search-users/:param', async (req, res) => {
    const { param } = req.params;

    var ObjectId = mongoose.Types.ObjectId;
    var test;
    try {
      test = new ObjectId(param);
    } catch(err) {
      console.log("Not a valid ObjectId")
    }

    var filter;
    if(test) {
      filter = {'_id': test}
    } else {
      filter = {'name': param}
    }

    const user = await User.find(filter, (err, user) => {
      if (err) return err;
      return user;
    });
    res.send(user);
  });

  // Search for single user based on ID
  app.get('/api/search-user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }, (err, user) => {
      if (err) return err;
      return user;
    });
    res.send(user);
  });

  // Create a new user if one doesn't already exist in database
  app.post('/api/post-user/', async (req, res) => {
    // Using destructuring to grab name and age parameters
    // off of the req.body object
    const { name, age } = req.body;

    // Create a new user item using the User model
    // Then save it to your database
    const user = await new User({
      name,
      age
    }).save();
    res.send(user);
  });

  // Update route to change user data
  app.put('/api/update-user/', async (req, res) => {
    console.log(req.body);
    const { _id, name, age } = req.body;
    const userToUpdate = await User.findOneAndUpdate({ _id }, {_id, name, age}, (err, user) => {
      if (err) return err;
      return user;
    });
    res.send(userToUpdate);
  });

  // Route to handle deleting user item from database
  app.delete('/api/delete-user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.remove({ _id: id }, (err, res) => {
      if (err) return err;
      return res;
    });
    res.send(user);
  });

  app.delete('/api/empty-database', async (req, res) => {
    const users = await User.remove({}, (err, res) => {
      if (err) return err;
      return res;
    });
    res.send(users);
  });
};