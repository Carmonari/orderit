const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys  = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');

//Load user model
const User = require('../../models/User');

// @route   Post api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try{
    const { errors, isValid } = validateRegisterInput(req.body);
    
    //Check validation
    if(!isValid){
      return res.status(400).json(errors);
    }

    let checkEmail = await User.findOne({ email: req.body.email });
    if(checkEmail){
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

    // Create new User
    newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Gen hash password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    
    // Save in database
    let UserSave = await newUser.save();
    res.json(UserSave);
    
  }
  catch(err) {
    return res.status(500).json({ msg: "Fail post register " + err });
  }
});

module.exports = router;