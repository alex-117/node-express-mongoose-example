const mongoose = require('mongoose');

// This is referred to as 'destructuring'
const { Schema } = mongoose;
// It's the same if you did:
// ```const Schema = mongoose.Schema; ```


const User = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

mongoose.model('users', User);