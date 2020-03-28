const express = require('express');

const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/**
 * Definindo a rota raiz
 * 
 * Método GET = Buscar uma informação
 * Método POST = Criar uma informação
 * Método PUT = Alterar uma informação
 * Método DELETE = Deletar uma informação
 */

 /**
  * Tipos de parâmetros:
  * 
  *  Query: parâmetros nomeados enviados na rota após "?" (filtros, paginação)
  *  Route: são parâmetros utilizados para identificar recursos após "/"
  *  Request Body: Corpo da requisição. utilizadp para criar ou alterar recursos 
  */

/*routes.post('/users', (request, response) =>{

    //const params = request.query; #query
    //const params = request.params; #route
    //const params = request.body; #body

    const body = request.body;

    console.log(body)

    return  response.json({
                evento: 'Semana OmniStack 11.0',
                aluno: 'Leonardo Nishida'
            });
    //return response.send('Hello World');
       
});*/

routes.post('/ongs', OngController.create);

routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', IncidentController.index);

routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);

//disponibilizando as rotas
module.exports = routes;
