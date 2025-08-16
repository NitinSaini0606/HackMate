const mongoose = require('mongoose');

const eduSchema = new mongoose.Schema({

    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },

  collegeName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  cityName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  stream: {
    type: String,
    required: true,
    maxlength: 100,
  },
  spec: {
    type: String,
    required: true,
    maxlength: 50,
  },
  yearStudy: {
    type: Number,
    required: true,
    
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Edu = mongoose.model("Edu" , eduSchema);
module.exports = Edu;