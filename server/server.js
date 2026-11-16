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

app.post('/logar_usuario', (req, res) => {
    let login = req.body.login;
    let senha = req.body.senha;

    let data = { dbLogin: login, dbSenha: senha };

    usuarios.find(data).toArray((err, items) => {
        if (err) {
            res.render('resposta_usuario.ejs', { resposta: "Erro ao buscar usuário" });
        }

        if (items.length == 0) {
            res.render('resposta_usuario.ejs', { resposta: "Usuário ou senha não encontrados" });
        }

        res.render('resposta_usuario.ejs', { resposta: 'Usuário logado com sucesso!' });
    });
});

app.post('/editar_usuario', async (req, res) => {
    let login = req.body.login;
    let senha = req.body.senha;
    let novaSenha = req.body.novasenha;

    let data = { dbLogin: login, dbSenha: senha };
    let newData = { $set: { dbSenha: novaSenha } };

    const result = await usuarios.updateOne(data, newData);

    console.log(result);

    if (result.matchedCount == 0) {
        res.render('resposta_usuario.ejs', { resposta: 'Usuário ou senha não encontrados' });
    }

    res.render('resposta_usuario.ejs', { resposta: 'Senha atualizada com sucesso!' });
});

app.post('/remover_usuario', async (req, res) => {
    let login = req.body.login;
    let senha = req.body.senha;

    let data = { dbLogin: login, dbSenha: senha };

    const result = await usuarios.deleteOne(data);

    console.log(result);

    if (result.deletedCount == 0) {
        res.render('resposta_usuario.ejs', { resposta: 'Usuário/senha não encontrados' });
    }

    res.render('resposta_usuario.ejs', { resposta: 'user deletado' });
});