const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
//Load user model
const Products = require('../../models/Products');
const Pedidos = require('../../models/Pedidos');

// @route   GET api/products/home/:idHome
// @desc    Get products
// @access  Private
router.get('/home/:idHome', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try{
    let products = await Products.find({home: req.params.idHome}).sort({ date: -1});
    res.json(products);
  }
  catch(err){
    res.status(400).json({ noproductsfound: 'No hay productos'})
  }
});

// @route   GET api/products/section/:idHome
// @desc    Get products
// @access  Private
router.get('/section/:idHome', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try{
    let products = await Products.find({seccion: req.params.idHome}).sort({ date: -1});
    res.json(products);
  }
  catch(err){
    res.status(400).json({ noproductsfound: 'No hay productos'})
  }
});

// @route   Post api/products/search
// @desc    get products
// @access  Private
router.post('/search', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    const { search } = req.body;
    let products = await Products.find({
      $or: [
        { name: new RegExp(`${search}`, 'i') }, { home: new RegExp(`${search}`, 'i') }, { seccion: new RegExp(`${search}`, 'i') },
        { descripcion: new RegExp(`${search}`, 'i') }
      ]
    }).sort({ date: -1});
    res.json(products);
  } catch (err) {
    res.status(400).json({ noproductsfound: 'No hay productos'})
  }
})

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
});

// @route   PUT api/products/like/:id
// @desc    Like a product
// @access  Private
router.put('/like/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    // Check if the product has already been liked
    if(product.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      return res.status(400).json({ msg: 'Product already liked'});
    }

    product.likes.unshift({ user: req.user.id });

    await product.save();

    res.json(product.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/products/unlike/:id
// @desc    Like a product
// @access  Private
router.put('/unlike/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    // Check if the product has already been liked
    if(product.likes.filter(like => like.user.toString() === req.user.id).length === 0){
      return res.status(400).json({ msg: 'Product no tiene fav'});
    }

    // Get remove index
    const removeIndex = product.likes.map(like => like.user.toString()).indexOf(req.user.id);

    product.likes.splice(removeIndex, 1);

    await product.save();

    res.json(product.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   PATCH api/products/raiting/:id
// @desc    Like a product
// @access  Private
router.patch('/raiting/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    const index = await product.raiting.findIndex(rait => rait.user.toString() === req.user.id);

    // Check if the product has already been liked
    if(product.raiting.filter(rait => rait.user.toString() === req.user.id).length > 0){
      product.raiting[index].rait = req.body.rating;
    }
    else{
      product.raiting.unshift({ user: req.user.id, rait: req.body.rating });
    }

    await product.save();

    res.json(product.raiting);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   GET api/products/raiting/:id
// @desc    Get raiting of product
// @access  Private
router.get('/raiting/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    const product = await Products.aggregate([
      {
        $match:  { _id: ObjectId(req.params.id)}
      },
      {
        $unwind: "$raiting"
      },
      {
        $group: {
        _id: null,
        avgRaiting: { $avg: "$raiting.rait" }
      }
    }]);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   GET api/products/raiting/:id
// @desc    Get raiting of product
// @access  Private
router.get('/raiting/user/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    let rat;
    let product = await Products.findOne({ "_id": ObjectId(req.params.id), "raiting.user": { $in: [ ObjectId(req.user.id)]}},
                  ['raiting.user','raiting.rait'])
    await product.raiting.map(async (item) => {
      if(item.user == req.user.id){
        rat = item.rait;
        return rat
      }
    })
    res.json(rat);
  } catch (err) {
    console.error(err);
    res.json(0);
  }
});

// @route   GET api/products/like
// @desc    get user likes
// @access  Private
router.get('/like', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    const products = await Products.find({ 'likes.user': req.user.id });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   Post api/products/pedidos
// @desc    add pedidos
// @access  Private
router.post('/pedidos', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    const { idCompra, entrega, status, direccion, cart, total } = req.body;
    newPedido = new Pedidos({
      idCompra,
      user: req.user.id,
      entrega,
      status,
      direccion,
      cart,
      total
    });
    let savePedidos = await newPedido.save();
    res.json(savePedidos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   GET api/products/pedidos
// @desc    get pedidos
// @access  Private
router.get('/pedidos', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    let pedidos = await Pedidos.find({'user': req.user.id}).sort({date: -1});
    res.json(pedidos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   GET api/products/pedidos/:idCompra
// @desc    get pedidos
// @access  Private
router.get('/pedidos/:idCompra', passport.authenticate('jwt', { session: false}), async (req, res) => {
  try {
    let pedidos = await Pedidos.findOne({'idCompra': req.params.idCompra});
    res.json(pedidos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;