import express from 'express';
import path from 'path';

const app = express();
const port = 8080;

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.get('/app', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'public', 'index_d.html'));
});

app.listen(port, () => {
    console.log(`server rodando em: http://localhost:${port}`)
});
