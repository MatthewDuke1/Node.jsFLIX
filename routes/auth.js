const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const configuration = require('config');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password');
    const token = user.generateAuthToken();

    res.send(true);
});


function validate(req) {
    const schema = {
      name: Joi.string().min(5).max(250).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }
module.exports = router;