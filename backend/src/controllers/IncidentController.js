const connection = require('../database/connection');

module.exports = {

    async create(request, response) {

        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({
            id
        })

    },

    async index(request, response) {

        const {page = 1} = request.query;
                                                        //Paginação
        const incidents = await connection('incidents')
                                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                                .limit(5)
                                .offset((page - 1) * 5)
                                .select([
                                    'incidents.*', 
                                    'ongs.name', 
                                    'ongs.email', 
                                    'ongs.whatsapp', 
                                    'ongs.city', 
                                    'ongs.uf'
                                ]);
                                
        const [count] = await connection('incidents').count();

        //total de registros pelo header do response para paginação
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);

    },

    async delete(request, response) {

        const {id} = request.params;
        const ong_id = request.headers.authorization;

        console.log(id);

        const incident = await connection('incidents').where('id',id).select('ong_id').first();

        console.log(incident);

        if(incident.ong_id != ong_id) {
            
            return response.status(404).json({
                "error": "Operation not permitted!"
            });

        } else {

            await connection('incidents').where('id', id).delete();

            return response.status(204).send();

        }

    }

}