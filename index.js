require("dotenv").config();
const express = require("express");
const User = require("./Models/User.model");
const authRouter = require("./Routes/auth.routes");
const userRouter = require("./Routes/user.routes");
const Conexao = require("./Services/Database");
const app = express();
app.use(express.json());
const port = process.env.PORT | 4000;
Conexao();
app.use("/auth", authRouter)
app.use("/user", userRouter);
app.listen(port, () => console.log(`rodando na porta ${port}`));
