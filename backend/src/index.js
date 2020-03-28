//Importando o pacote
const express = require('express');
//Criando a aplicação
const cors = require('cors');
const app = express();
//Importando as rotas
const routes = require('./routes')

app.use(cors());
//informando que estaremos usando JSON para requisiçoes
app.use(express.json());
//Para o app utilizar as rotas
app.use(routes);

//Porta que a aplicação irá usar
app.listen(3333);

