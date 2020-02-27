//Bring in express so we can build the router
const express = require('express');

//bring in express validator
const { check, validationResult } = require('express-validator');

//bring in config
const config = require('config');

//bring in jsonwebtoken
const token = require('jsonwebtoken');

//bring in bcrypt
const bcrypt = require('bcryptjs');

//bring in middleware
const auth = require('../middleware/auth');

//bring ins user
const User = require('../models/User');

//build the router

const router = express.Router();

//@route  GET api/auth
//@desc return logged in user
//@access private
router.get('/', auth, async (req, res) => {
  try {
    //get the user from the database
    const user = await User.findById(req.user.id).select('-password');

    //send the user
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

//@route POST api/auth
//@desc authenticate and log in the user
//@access private
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),

    check('password', 'Please enter a password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    //check to see if a user exists by that email
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'invalid credentials' });
      }

      //if there is a match compare the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'password does not match' });
      }

      //create payload to send in the token
      const payload = {
        user: {
          id: user.id
        }
      };

      //generate a token

      token.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

//export router

module.exports = router;
