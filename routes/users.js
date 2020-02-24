//bring in express so that we can use the router
const express = require('express');

//bring in express validator
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//use express to create the router
const router = express.Router();

//@route POST api/users
//@desc Register a user
//@access Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),

    check('email', 'Please include a valid email').isEmail(),

    check('password', 'Please enter 6 or more characters').isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.send('passed!');
    }
  }
);

module.exports = router;
