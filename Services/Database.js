const mongoose = require("mongoose");
const Conexao = async () => {
  await mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URL, { dbName: "netflix" })
    .then(() => console.log("mongodb conectado com sucesso"))
    .catch((e) => console.log(e));
};
module.exports = Conexao;
