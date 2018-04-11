//====LIST DEPENDENCIES===//
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Signature = require('./schema.js')
const app = express();
const url = 'mongodb://localhost:27017/Node_API';
app.use(bodyParser.json({ type: '*/*' }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//====ROOT DIRECTORY===//
app.get('/', function (req, res) {
  res.json('you did it');
});
//==========================//
//====GET ALL SIGNATURES===//
app.get('/api/quotes', function (req, res) {
  Signature.find({}).then(eachOne => {
    res.json(eachOne);
  })
})
//==========================//
//====POST NEW SIGNATURE===//
app.post('/api/quotes', function (req, res) {
  console.log("In post");
  Signature.create({
    name: req.body.name,
    quote: req.body.quote,
  }).then(signature => {
    res.json(signature)
  });
});

app.put('/api/quotes/:quote_id', function (req, res) {
  console.log("put");

  Signature.findById(req.params.quote_id, function (err, signature) {
    if (err) {
      res.send(err);
    }
    signature.name = req.body.name;
    signature.quote = req.body.quote;
    signature.save(function (err) {
      if (err)
        res.send(err);

      res.json({ message: 'Signature updated!' });
    });

  });

})

app.delete('/api/quotes/:quote_id', function (req, res) {
  console.log("delete");

  Signature.remove({ _id: req.params.quote_id }, function (err, prod) {
    if (err) {
        res.send(err);
    }
    res.json({ message: 'Successfully deleted' });
})

})
//====MONGOOSE CONNECT===//
mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});
//==========================//
app.listen(process.env.PORT || 3090);
console.log('starting applicaiton.  Good job!');
