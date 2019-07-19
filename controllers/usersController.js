const { User } = require('../models');
// TODO: Error Handling
module.exports = {
  findAll: async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
  },


  //   // Search specific user(s) by name from User model using name
  //   app.get('/api/search-users/:param', async (req, res) => {
  //     const { param } = req.params;

  //     var { ObjectId } = mongoose.Types;
  //     var test;
  //     try {
  //       test = new ObjectId(param);
  //     } catch(err) {
  //       console.log("Not a valid ObjectId")
  //     }

  //     var filter;
  //     if(test) {
  //       filter = {'_id': test}
  //     } else {
  //       filter = {'name': param}
  //     }

  //     const user = await User.find(filter, (err, user) => {
  //       if (err) return err;
  //       return user;
  //     });
  //     res.send(user);
  //   });


  //   // Update route to change user data
  //   app.put('/api/update-user/', async (req, res) => {
  //     console.log(req.body);
  //     const { _id, name, age } = req.body;
  //     const userToUpdate = await User.findOneAndUpdate({ _id }, {_id, name, age}, (err, user) => {
  //       if (err) return err;
  //       return user;
  //     });
  //     res.send(userToUpdate);
  //   });

  //   // Route to handle deleting user item from database
  //   app.delete('/api/delete-user/:id', async (req, res) => {
  //     const { id } = req.params;
  //     const user = await User.remove({ _id: id }, (err, res) => {
  //       if (err) return err;
  //       return res;
  //     });
  //     res.send(user);
  //   });



  // findAll: function(req, res) {
  //   db.Book
  //     .find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findById: function(req, res) {
  //   db.Book
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // create: function(req, res) {
  //   db.Book
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // update: function(req, res) {
  //   db.Book
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Book
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
