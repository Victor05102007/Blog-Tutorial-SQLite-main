const express = require("express");

const PORT = 3000;

const app = express();

const index = "<a href='/sobre'>Sobre</a><br><a href='/info'>Info</a>";
const sobre = 'Vc esta na pagina "sobre" <br><a href="/">Voltar</a>';
const info = 'Vc esta na pagina "info" <br><a href="/">Voltar</a>';

/* Método express.get necessita de dois paârametros
na ARROW FUNCTION, o primeiro são os dados do servidor(REQUISITION - 'REQ')
o segundo, são os dados que serão enviador para ao cliente (RESULE - "RES")

*/
app.get("/", (req, res) => {
  res.send(index);
});

app.get("/sobre", (req, res) => {
  res.send(sobre);
});

app.get("/info", (req, res) => {
  res.send(info);
});

//app.get("/sextou", (req, res) => {
// res.send("Sextou com S de SENAS");
//});

// app.listes() deve ser o ultimo comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
