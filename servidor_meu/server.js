import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/asd', (req, res) => {
    res.render('resp.ejs')
});

app.listen(port, () => {
    console.log(`server rodando em: http://localhost:${port}`)
});


console.log(`servidor rodando`);
