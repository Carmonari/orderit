const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys  = require('../../config/keys');
const passport = require('passport');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/User');

/*Avatar*/
var fs = require('fs');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') //Destination folder
  },
  filename: function (req, file, cb) {
    let fileObj = {
      "image/png": ".png",
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg"
    };
    let img = req.body.id + req.body.name + fileObj[file.mimetype];
    cb(null, img) //File name after saving    
  }
})

var upload = multer({ storage: storage });

//other imports and code will go here
router.post('/upload', upload.single('fileData'), async (req, res) => {
  try{
    let fileObj = {
      "image/png": ".png",
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg"
    };
    let img = req.body.id + req.body.name + fileObj[req.file.mimetype];
    let avatar = await User.findOneAndUpdate({ "_id": req.body.id }, { $set: { "avatar": img } });
    res.json(avatar);
  } catch(err){
    console.error(err)
    res.status(500).send("Server Err")
  }
});

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

// @route   Post api/users/forgot
// @desc    forgot pass user
// @access  Public
router.post('/forgot', async (req, res) => {
  try {
    const email = req.body.email;
    let errors = {};
    //Find user by email
    let user = await User.findOne({ email });
    if(!user){
      errors.email = 'Usario no encontrado';
      return res.status(404).json(errors);
    }
    var randomstring = Math.random().toString(36).slice(-8);

    // Gen hash password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(randomstring, salt);

    let changePass = await User.findOneAndUpdate({"email": email}, {$set: {"password": hash}});

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: "smtp.gmail.email",
      port: 465,
      secure: true,
      auth: {
        user: "wwunit19@gmail.com", // generated ethereal user
        pass: "Camelsinfiltro" // generated ethereal password
      }
    }));

    let info = await transporter.sendMail({
      from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
      to: email, // list of receivers
      subject: "New pass ✔", // Subject line
      text: "New password", // plain text body
      html: "<b>"+randomstring+"</b>" // html body
    })
  
    console.log("Message sent: %s", info.messageId);
    res.json(changePass);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the server")
  }
})

// @route   GET api/users/profile/:id
// @desc    Profile
// @access  Private
router.get('/profile/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    let perfil = await User.findById(req.params.id, ['name', 'email', 'aPaterno', 'aMaterno', 'cel', 'avatar']);
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
});

// @route   PATCH api/users/direcciones
// @desc    direcciones
// @access  Private
router.patch('/direcciones', passport.authenticate('jwt', { session: false }), async (req, res) =>{
  try {
    const { name, calle, numero_ext, numero_int, colonia, municipio, cp, estado, pais } = req.body;
    let fields = {
      name,
      calle,
      numero_ext,
      numero_int,
      colonia,
      municipio,
      estado,
      pais,
      cp
    }
    let address = await User.findById(req.user.id);
    address.direcciones.unshift(fields);
    let added = await address.save();
    res.json(added);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   GET api/users/direcciones
// @desc    direcciones
// @access  Private
router.get('/direcciones', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let address = await User.findById(req.user.id).select("direcciones");
    res.json(address);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   GET api/users/direcciones/:id
// @desc    direccion
// @access  Private
router.get('/direcciones/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let address = await User.findById(req.user.id);

    const getIndex = address.direcciones.map(dire => dire._id.toString()).indexOf(req.params.id);

    res.json(address.direcciones[getIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   Patch api/users/direcciones/:id
// @desc    Update address
// @access  Private
router.patch('/direcciones/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let address = await User.findById(req.user.id);

    const { name, calle, numero_ext, numero_int, cp, colonia, municipio, estado, pais } = req.body;

    address.direcciones.map(dire => {
      if(dire._id.toString() === req.params.id) {
        return (
          dire.name = name,
          dire.calle = calle,
          dire.numero_ext = numero_ext,
          dire.numero_int = numero_int,
          dire.cp = cp,
          dire.colonia = colonia,
          dire.municipio = municipio,
          dire.estado = estado,
          dire.pais = pais
        )
      }
    });

    await address.save();
    res.json(address);

  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
})

// @route   DELETE api/users/direcciones/:id
// @desc    direcciones
// @access  Private
router.delete('/direcciones/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let dire = await User.findById(req.user.id).select("direcciones");

    const removeIndex = await dire.direcciones.map(item => item.id).indexOf(req.params.id);
    await dire.direcciones.splice(removeIndex, 1);

    await dire.save();
    res.json(dire);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   Patch api/users/direcciones/status/:id
// @desc    Update status
// @access  Private
router.patch('/direcciones/status/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let statusChange = await User.findById(req.user.id).select("direcciones");

    statusChange.direcciones.map(status => {
      if(status._id.toString() === req.params.id) {
        return status.status = !status.status
      } else {
        return status.status = false
      }
    });

    await statusChange.save();

    res.json(statusChange);

  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   PATCH api/users/facturas
// @desc    facturas
// @access  Private
router.patch('/facturas', passport.authenticate('jwt', { session: false }), async (req, res) =>{
  try {
    const { name, tipo_persona, razon_social, calle, numero_ext, numero_int, colonia, municipio, cp, estado, pais } = req.body;
    let fields = {
      name,
      tipo_persona,
      razon_social,
      calle,
      numero_ext,
      numero_int,
      colonia,
      municipio,
      estado,
      pais,
      cp
    }
    let bills = await User.findById(req.user.id);
    bills.facturas.unshift(fields);
    let added = await bills.save();
    res.json(added);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   GET api/users/facturas
// @desc    facturas
// @access  Private
router.get('/facturas', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let bills = await User.findById(req.user.id).select("facturas");
    res.json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   GET api/users/facturas/:id
// @desc    facturas
// @access  Private
router.get('/facturas/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let bills = await User.findById(req.user.id);

    const getIndex = bills.facturas.map(bill => bill._id.toString()).indexOf(req.params.id);

    res.json(bills.facturas[getIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   Patch api/users/facturas/:id
// @desc    Update facturas
// @access  Private
router.patch('/facturas/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let bills = await User.findById(req.user.id);

    const { name, razon_social, tipo_persona, calle, numero_ext, numero_int, cp, colonia, municipio, estado, pais } = req.body;

    bills.facturas.map(bill => {
      if(bill._id.toString() === req.params.id) {
        return (
          bill.name = name,
          bill.tipo_persona = tipo_persona,
          bill.razon_social = razon_social,
          bill.calle = calle,
          bill.numero_ext = numero_ext,
          bill.numero_int = numero_int,
          bill.cp = cp,
          bill.colonia = colonia,
          bill.municipio = municipio,
          bill.estado = estado,
          bill.pais = pais
        )
      }
    });

    await bills.save();
    res.json(bills);

  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
})

// @route   DELETE api/users/facturas/:id
// @desc    facturas
// @access  Private
router.delete('/facturas/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let bill = await User.findById(req.user.id).select("facturas");

    const removeIndex = await bill.facturas.map(item => item.id).indexOf(req.params.id);
    await bill.facturas.splice(removeIndex, 1);

    await bill.save();
    res.json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

// @route   Patch api/users/facturas/status/:id
// @desc    Update status
// @access  Private
router.patch('/facturas/status/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    let statusChange = await User.findById(req.user.id).select("facturas");

    statusChange.facturas.map(status => {
      if(status._id.toString() === req.params.id) {
        return status.status = !status.status
      } else {
        return status.status = false
      }
    });

    await statusChange.save();

    res.json(statusChange);

  } catch (err) {
    console.error(err);
    res.status(500).send("Err in the Server");
  }
});

module.exports = router;