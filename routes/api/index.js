const router = require("express").Router();
const userRoutes = require("./user");
const usersRoutes = require("./users");

// user routes
router.use("/user", userRoutes);
router.use("/users", usersRoutes);

module.exports = router;
