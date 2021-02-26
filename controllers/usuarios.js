const { response, request } = require('express');

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

const postUsuario = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: "post API - Controlador",
        nombre,
        edad
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