const { hashSync } = require("bcryptjs");
const User = require("../Models/User.model");
const userRouter = require("express").Router();

userRouter.patch("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    req.body.senha = hashSync(req.body.senha, 10);
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      const { senha, ...data } = user._doc;
      res.status(200).json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(401).json({ message: "Usuario não autenticado" });
  }
});

userRouter.delete("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Usuario deletado com sucesso" });
    } catch (err) {
      res.status(401).json({ err });
    }
  } else {
    res.status(400).json({ message: "Usuario não autenticado" });
  }
});

userRouter.get("/users", async (req, res) => {
    const user = await User.find();
  try {
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = userRouter;
