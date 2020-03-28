const connection = require('../database/connection');

const crypto = require('crypto');


module.exports = {
    
    async create(request, response)  {
        
        const{name, email, whatsapp, city, uf} = request.body;

        //criar id
        const id = crypto.randomBytes(4).toString('HEX');

        //persistir o objeto
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({
            "id":id
        });

    },

    async index(request, response) {
    
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    
    }

}