const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load user model
const Homes = require('../../models/Homes');

// @route   GET api/homes
// @desc    Get homes
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try{
    let homes = await Homes.find().sort({ orden: 'asc'});
    res.json(homes);
  }
  catch(err){
    res.status(400).json({ nohomesfound: 'No hay homes'})
  }
});


module.exports = router;