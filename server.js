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

function lerDadosCarro(body) {
    const ano = Number(body.ano);
    const camposTexto = [body.marca, body.modelo, body.cor];

    if (
        !camposTexto.every((campo) => typeof campo === 'string' && campo.trim()) ||
        !Number.isInteger(ano) ||
        ano <= 0 ||
        !['true', 'false'].includes(body.automatico)
    ) {
        return null;
    }

    return {
        marca: body.marca.trim(),
        modelo: body.modelo.trim(),
        cor: body.cor.trim(),
        ano,
        automatico: body.automatico === 'true'
    };
}

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
            carros: items,
            mensagem: req.query.mensagem || ''
        });
    } catch (err) {
        console.error(`Erro ao buscar carros: ${err}`);
        res.status(500).send('Erro ao buscar carros.');
    }
});

app.post('/carros/cadastrar', async (req, res) => {
    const data = lerDadosCarro(req.body);
    if (!data) {
        return res.status(400).send('Dados do carro inválidos.');
    }

    try {
        await carros.insertOne(data);
        res.redirect('/carros?mensagem=Carro+cadastrado+com+sucesso');
    } catch (err) {
        console.error(`Erro ao cadastrar carro: ${err}`);
        res.status(500).send('Erro ao cadastrar carro.');
    }
});

app.post('/carros/editar', async (req, res) => {
    if (!mongodb.ObjectId.isValid(req.body.id)) {
        return res.status(400).send('Identificador de carro inválido.');
    }

    const data = lerDadosCarro(req.body);
    if (!data) {
        return res.status(400).send('Dados do carro inválidos.');
    }

    try {
        const result = await carros.updateOne(
            { _id: new mongodb.ObjectId(req.body.id) },
            { $set: data }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('Carro não encontrado.');
        }

        res.redirect('/carros?mensagem=Carro+atualizado+com+sucesso');
    } catch (err) {
        console.error(`Erro ao atualizar carro: ${err}`);
        res.status(500).send('Erro ao atualizar carro.');
    }
});

app.post('/carros/excluir', async (req, res) => {
    if (!mongodb.ObjectId.isValid(req.body.id)) {
        return res.status(400).send('Identificador de carro inválido.');
    }

    try {
        const result = await carros.deleteOne({
            _id: new mongodb.ObjectId(req.body.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).send('Carro não encontrado.');
        }

        res.redirect('/carros?mensagem=Carro+excluido+com+sucesso');
    } catch (err) {
        console.error(`Erro ao excluir carro: ${err}`);
        res.status(500).send('Erro ao excluir carro.');
    }
});

app.listen(port, () => {
    console.log(`server rodando em: http://localhost:${port}`)
});
