const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys  = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

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
    return res.status(500).json({ msg: "Fail post register " });
  }
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  try{
    const { errors, isValid } = validateLoginInput(req.body);

    //Check validation
    if(!isValid){
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    let user = await User.findOne({ email });
    if(!user){
      errors.email = 'Usario no encontrado';
      return res.status(404).json(errors);
    }

    //Check password
    let checkPass = await bcrypt.compare(password, user.password);
    if(checkPass){
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      }; // Create JWT Payload

      //Sign Token
      let token = await jwt.sign(payload, keys.secretOrKey);
      res.json({
        success: true,
        token: 'Bearer ' + token
      })
    }
    else{
      errors.password = 'Password incorrecto';
      return res.status(400).json(errors);
    }
  }
  catch(err){
    return console.log(err);
  }
});

// @route   GET api/users/profile/:id
// @desc    Profile
// @access  Private
router.get('/profile/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    let perfil = await User.findById(req.params.id, ['name', 'email', 'aPaterno', 'aMaterno', 'cel']);
    res.json(perfil);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the server")
  }
});

// @route   PUT api/users/profile/:id
// @desc    Profile
// @access  Private
router.put('/profile/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let checkEmail = await User.findOne({ email: req.body.email });
    if(checkEmail){
      if(checkEmail._id != req.params.id){
        return res.status(400).json({email: 'Email already exists'});
      }
    }
    let fields = {
      name: req.body.name,
      email: req.body.email,
      aPaterno: req.body.aPaterno,
      aMaterno: req.body.aMaterno,
      cel: req.body.cel
    }
    let perfil = await User.findOneAndUpdate({"_id": req.params.id}, fields, {new: true});
    res.json(perfil);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
})

module.exports = router;