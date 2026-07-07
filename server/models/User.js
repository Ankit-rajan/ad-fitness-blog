const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: "",
  },

  age: {
    type: Number,
    default: null,
  },

  gender: {
    type: String,
    default: "",
  },

  height: {
    type: Number,
    default: null,
  },

  weight: {
    type: Number,
    default: null,
  },

  goal: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});


const User = mongoose.model("User", userSchema);

module.exports = User;