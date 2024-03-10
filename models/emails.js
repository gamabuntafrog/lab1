const { Schema, default: mongoose } = require("mongoose");

// theme, description, sendDate, to: {name, address}\

const Emails = new Schema({
  theme: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sendDate: {
    type: Date,
    required: true,
  },
  to: {
    type: {
      name: String,
      address: String,
    },
    required: true,
  },
});

module.exports = { Emails: mongoose.model("Email", Emails) };
