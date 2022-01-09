const express = require('express');
const mongoose = require('mongoose');

const formschema = mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    address1:{
       type:String,
       require:true,
       trim:true
    },
    address2:{
       type:String
    },
    city:{
       type:String,
       require:true,
       trim:true
    },
    country:{
        type:String,
        require:true,
        trim:true
    }
});

const yourdata = mongoose.model('yourdata' , formschema);

module.exports = yourdata;