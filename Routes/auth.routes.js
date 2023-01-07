const User = require("../Models/User.model");
const bcrypt = require("bcryptjs");
const authRouter = require("express").Router();

authRouter.post("/", async (req, res) => {
  await User.findOne(req.body);
  try {
    req.body.senha = bcrypt.hashSync(req.body.senha, 10);
    const user = await User.create(req.body);
    // criar token
    const { senha, ...data } = user._doc;
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: "Usuario já existe!" });
  }
});

authRouter.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  try {
    if (user) {
      const validar = await bcrypt.compareSync(req.body.senha, user.senha);
      const { senha, ...token } = user._doc;
      if (validar) {
        res.status(200).json({ token });
      } else {
        res.status(400).json({ message: `Senha errada` });
      }
    } else {
      res.status(401).json({ message: "Usuario não encontrado" });
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
});

module.exports = authRouter;
