const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conexion a la DB de Mongo
        this.dbConexion();

        //Middelwares
        this.middelwares();

        // Rutas de mi aplicaión
        this.routes();
    }

    async dbConexion() {
        await dbConnection();
    }

    middelwares() {

        // Cors
        this.app.use(cors());

        // Lectura y Parseo del Body JSON
        this.app.use(express.json());

        // Directorio Publico.
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    listen() {

        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${ this.port }`);
        });
    }

}

module.exports = Server;