const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');

const users = require('./routes/api/users');
const homes = require('./routes/api/homes');
const sections = require('./routes/api/sections');
const products = require('./routes/api/products');

const app = express();

app.use(cors())

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }).then(() => console.log('MongoDB connected')).catch(err => consolo.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// static middleware
app.use(express.static('uploads'));

app.use('/api/users', users);
app.use('/api/homes', homes);
app.use('/api/sections', sections);
app.use('/api/products', products);

const port = process .env.PORT || 5000;

app.listen(port, () => console.log(`Server running port ${port}`));