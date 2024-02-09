const mongoose = require("mongoose");

const userImfoSchema = {
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
};

const userImfo = mongoose.model("usersDetails", userImfoSchema);

module.exports = userImfo;
