//bring in express so that we can use the router
const express = require('express');

//bring in express validator
const { check, validationResult } = require('express-validator');

const config = require('config');

//bring in jsonwebtoken
const token = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;

      try {
        //check to see if a user already exists with that email
        let user = await User.findOne({ email });

        // if there is a user send this message
        if (user) {
          res.status(400).json({ msg: 'user already exists' });
        }

        //else create a user

        user = new User({
          name,
          email,
          password
        });

        //generate salt to encrypt password
        const salt = await bcrypt.genSalt(10);

        //encrypt password
        user.password = await bcrypt.hash(password, salt);

        //store user into the database
        await user.save();

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
      }
    }
  }
);

module.exports = router;
