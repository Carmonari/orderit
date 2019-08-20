const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load user model
const Sections = require('../../models/Sections');

// @route   GET api/sections
// @desc    Get sections
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try{
    let sections = await Sections.find({status: true}).sort({ home: -1});
    res.json(sections);
  }
  catch(err){
    res.status(400).json({ nosectionsfound: 'No hay secciones'})
  }
});


module.exports = router;