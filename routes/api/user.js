const router = require("express").Router();
const userController = require("../../controllers/userController");

// endpoint: "/api/user/:name"
router.route("/:name")
  .get(userController.findUserByName)
  .put(userController.updateUser);

// router.route("/")






module.exports = router;
//  = (app) => {



//   // Search for single user based on ID
//   app.get('/api/search-user/:id', async (req, res) => {
//     const { id } = req.params;
//     const user = await User.findOne({ _id: id }, (err, user) => {
//       if (err) return err;
//       return user;
//     });
//     res.send(user);
//   });

//   // Create a new user if one doesn't already exist in database
//   app.post('/api/post-user/', async (req, res) => {
//     // Using destructuring to grab name and age parameters
//     // off of the req.body object
//     const { name, age } = req.body;
//     console.log("TCL: req.body", req.body)

//     // Create a new user item using the User model
//     // Then save it to your database
//     const user = await new User({
//       name,
//       age
//     }).save();
//     res.send(user);
//   });



//   app.delete('/api/empty-database', async (req, res) => {
//     const users = await User.remove({}, (err, res) => {
//       if (err) return err;
//       return res;
//     });
//     res.send(users);
//   });
// };







// module.exports = router;
