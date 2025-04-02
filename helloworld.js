const express = require("express");

const PORT = 3000;

const app = express();

/* Método express.get necessita de dois paârametros
na ARROW FUNCTION, o primeiro são os dados do servidor(REQUISITION - 'REQ')
o segundo, são os dados que serão enviador para ao cliente (RESULE - "RES")

*/
app.get("/", (req, res) => {
  res.send("Ola Sesi");
});

// app.listes() deve ser o ultimo comando da aplicação (app.js)
app.listen(PORT, () => {
  Console.log(`Servidor sendo executado na porta ${PORT}`);
});
