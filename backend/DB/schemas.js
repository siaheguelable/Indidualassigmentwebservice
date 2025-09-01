const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  professionalName: String,
  base64Image: String,
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String
  },
  githubLink: {
    text: String,
    link: String
  },
  nameLink: {
    firstName: String,
    url: String
  },
  name: String,
  email: { type: String, unique: true },
  age: Number
});

module.exports = mongoose.model("User", userSchema);
