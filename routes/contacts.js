//CRUD
const express = require('express');

//create router
const router = express.Router();

//bring in middleware
const auth = require('../middleware/auth');

//bring in express validator
const { check, validationResult } = require('express-validator');

//bring in user model
const User = require('../models/User');

//bring in contact model
const Contact = require('../models/Contact');

//@route  POST api/contacts
//@desc create contact
//@access private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //pull contacts for a specific user

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, phone, type } = req.body;

      try {
        const newContact = new Contact({
          name,
          email,
          phone,
          type,
          user: req.user.id
        });

        //save to the database
        const contact = await newContact.save();

        res.json(contact);
      } catch (error) {
        console.error(error.message);

        res.status(500).send('Server Error');
      }
    }
  }
);

//@route GET api/contacts/
//@get contacts for user
//@access private

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });

    res.json(contacts);
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

//@route PUT api/contacts/:id
//@update current contacts
//@access private

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //build contact object
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    //update the fields
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

//@route DELETE api/contacts/:id
//@access private
//@dec delete contacts

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    //delete contact
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact Removed' });
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
