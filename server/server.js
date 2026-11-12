let colors = require('colors');
let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true });

let dbo = client.db('exemplo_bd');
let usuarios = dbo.collection('usuarios');

let app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

let server = http.createServer(app);
server.listen(3000);

console.log(`servidor rodando`);

/* ------------------------------------ x ----------------------------------- */
app.get('/cadastrar', (req, res) => {
    let nome = req.query.nome;
    let sobrenome = req.query.sobrenome;
    let email = req.query.email;
    let senha = req.query.senha;

    console.log(nome, sobrenome, email, senha);

    res.render('resposta.ejs', {
        nome_template: nome,
        sobrenome_template: sobrenome
    });
});

app.post('/cadastrar', (req, res) => {
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let email = req.body.email;
    let senha = req.body.senha;

    // let [nome, sobrenome, email, senha] = req.body;

    console.log(nome, sobrenome, email, senha);
});

app.post("/cadastrar_usuario", (req, resp) => {
    var data = { dbNome: req.body.nome, dbLogin: req.body.login, dbSenha: req.body.senha };

    usuarios.insertOne(data, (err) => {
        if (err) {
            console.log(err);
            resp.render('resposta_usuario.ejs', { resposta: "Erro ao cadastrar usuário!" });
        } else {
            resp.render('resposta_usuario.ejs', { resposta: "Usuário cadastrado com sucesso!" });
        }
    });
});
