const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load user model
const Products = require('../../models/Products');

// @route   GET api/products/:idHome
// @desc    Get products
// @access  Private
router.get('/:idHome', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try{
    let products = await Products.find({home: req.params.idHome}).sort({ date: -1});
    res.json(products);
  }
  catch(err){
    res.status(400).json({ noproductsfound: 'No hay productos'})
  }
});

// @route   GET api/products/detail/:idProduct
// @desc    Get products
// @access  Private
router.get('/detail/:idProduct', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try{
    let products = await Products.findById(req.params.idProduct);
    res.json(products);
  } catch(err){
    res.status(400).json({ noproductfound: 'no existe el producto' })
  }
})


module.exports = router;