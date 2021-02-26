const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuario = (req = request, res = response) => {

    const { q, nombre = 'No Name', apiKey } = req.query;

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apiKey
    });
};

const putUsuario = (req = request, res = response) => {

    const { id } = req.params;
    res.json({
        msg: "put API - Controlador",
        id
    });
};

const postUsuario = async(req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la DB
    await usuario.save();

    res.json({
        usuario
    });
};

const deleteUsuario = (req = request, res = response) => {
    res.json({
        msg: "delete API - Controlador"
    });
};

const patchUsuario = (req = request, res = response) => {
    res.json({
        msg: "patch API - Controlador"
    });
};


module.exports = {
    getUsuario,
    putUsuario,
    postUsuario,
    deleteUsuario,
    patchUsuario
};