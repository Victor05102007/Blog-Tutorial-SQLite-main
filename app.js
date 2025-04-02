const bodyParser = require("body-parser");
const express = require("express"); // importa a biblioteca do Express
const sqlite3 = require("sqlite3"); // importa a biblioteca do SQLite3

const PORT = 8000; // Porta do servidor HTTP

const app = express(); // intancia para uso da Biblioteca express

// Cria uma conexão com o banco de dados
const db = new sqlite3.Database("user.db"); // inatncia para o uso do Sqlite3, e usa o arquivo 'user.db'

db.serialize(() => {
  // Este metodo permite enviar comandos SQL em modo 'sequencial'
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT,
     email TEXT,  celular TEXT, cpf TEXT, rg TEXT)`
  );
});

// é a variavel interno do nodejs que guarda o caminho absoluto do projeto, no SO
console.log(__dirname);

//aqui sera acrescentado uma rota "/static", para a pasta __DIRNAME + "/static"
//o app.use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
//Middleware para isto, que neste caso é o express.static, que gerencia rotas estaticas
app.use("/static", express.static(__dirname + "/static"));

//Middleware para processar as requisições do body parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

const index =
  "<a href='/'>Home</a><br><a href='/login'>Login</a><br><a href='/senha'>Senha</a><br><a href='/cadastro'>Cadastro</a>";
const Sobre = 'Vc esta na pagina "login" <br><a href="/">Voltar</a>';
const Login = 'Vc esta na pagina "senha" <br><a href="/">Voltar</a>';
const Cadastro = 'Vc esta na pagina "cadastro" <br><a href="/">Voltar</a>';

/* Método express.get necessita de dois paârametros
na ARROW FUNCTION, o primeiro são os dados do servidor(REQUISITION - 'REQ')
o segundo, são os dados que serão enviados para ao cliente (RESULE - "RES")

*/
app.get("/", (req, res) => {
  //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.send("login não implementado");
});

app.get("/cadastro", (req, res) => {
  res.send(Cadastro);
});

app.get("/cadastro", (req, res) => {
  !req.body
    ? console.log(`Body vazio: ${req.body}`)
    : console.log(`${JSON.stringify(req.body)}`);
  res.send(Cadastro);
});

app.post("/cadastro", (req, res) => {
  req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.body}`);

  res.send(
    `Bem vindo usuario: ${req.body.nome}, seu email é ${req.body.email}`
  );
});

// app.listes() deve ser o ultimo comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
