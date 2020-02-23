//bring in express so that we can use the router
const express = require('express');

//use express to create the router
const router = express.Router();

//@route POST api/users
//@desc Register a user
//@access Public
router.post('/', (req, res) => {
  res.send('Registered a user.');
});

module.exports = router;
