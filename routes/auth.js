//Bring in express so we can build the router
const express = require('express');

//build the router

const router = express.Router();

//@route  GET api/auth
//@desc return logged in user
//@access private
router.get('/', (req, res) => {
  res.send('logged in a user');
});

//@route POST api/auth
//@desc authenticate and log in the user
//@access private
router.post('/', (req, res) => {
  res.send('user authenticated');
});

//export router

module.exports = router;
