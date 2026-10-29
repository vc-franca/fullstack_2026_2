let colors = require('colors');
let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs'); 	 
app.set('views', './views');

let server = http.createServer(app);
server.listen(3000);

console.log(`servidor rodando`.rainbow);

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

