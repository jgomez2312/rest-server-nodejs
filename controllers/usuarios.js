const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuario = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const queryEstado = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(queryEstado),
        Usuario.find(queryEstado)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const putUsuario = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra la base de datos.
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
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

const deleteUsuario = async(req = request, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
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