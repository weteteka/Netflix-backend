const mongoose = require("mongoose");

const User = mongoose.model(
  "usuarios",
  new mongoose.Schema(
    {
      nome: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      senha: { type: String, required: true },
      foto: { type: String, required: false },
    },
    { timestamps: true }
  )
);

module.exports = User;
