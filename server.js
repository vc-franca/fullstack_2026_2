import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;
/* -------------------------------------------------------------------------- */
/*                                    MONGO                                   */
/* -------------------------------------------------------------------------- */
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const db = client.db('carros');

let carros = db.collection('carros');
let usuarios = db.collection('usuarios');

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* -------------------------------------------------------------------------- */
/*                                     EJS                                    */
/* -------------------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', './views');

/* -------------------------------------------------------------------------- */
/*                                    ROTAS                                   */
/* -------------------------------------------------------------------------- */
app.post('/cadastrar', async (req, res) => {
    const data = { dbNome: req.body.nome, dbSenha: req.body.senha };

    try {
        const result = await usuarios.insertOne(data);

        console.log(`resultado: ${JSON.stringify(result)}`);

        return res.render('res_usuario.ejs', {
            resposta: 'usuário cadastrado com sucesso!'
        });
    } catch (err) {
        res.render('res_usuario.ejs', {
            resposta: `Erro ao cadastrar usuário: ${err}`
        });
    }
});

app.post('/logar', async (req, res) => {
    const { nome, senha } = req.body

    const data = { dbNome: nome, dbSenha: senha };

    try {
        const items = await usuarios.find(data).toArray();

        console.log(`resultado: ${JSON.stringify(items)}`);

        if (items.length === 0) {
            res.render('res_usuario.ejs', {
                resposta: 'usuário ou senha não encontrados'
            });
        }

        res.render('res_usuario.ejs', {
            resposta: 'usuário logado com sucesso!'
        });
    } catch (err) {
        res.render('res_usuario.ejs', {
            resposta: `Erro ao logar usuário: ${err}`
        });
    }
});

app.get('/carros', async (req, res) => {
    try {
        const items = await carros.find().toArray();

        res.render('carros.ejs', {
            carros: items
        });
    } catch(err) {
        console.error(`Erro ao buscar carros: ${err}`);
    }
});

app.listen(port, () => {
    console.log(`server rodando em: http://localhost:${port}`)
});
