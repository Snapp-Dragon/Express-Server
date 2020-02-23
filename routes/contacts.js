//CRUD
const express = require('express');

//create router
const router = express.Router();

//@route  POST api/contacts
//@desc create contact
//@access private

router.post('/', (req, res) => {
  res.send('Createed a contact');
});

//@route GET api/contacts/
//@get contacts for user
//@access private

router.get('/', (req, res) => {
  res.send('returned contacts');
});

//@route PUT api/contacts/:id
//@update current contacts
//@access private

router.put('/:id', (req, res) => {
  res.send('Updating contacts');
});

//@route DELETE api/contacts/:id
//@access private
//@dec delete contacts

router.delete('/:id', (req, res) => {
  res.send('deleted contacts');
});

module.exports = router;
