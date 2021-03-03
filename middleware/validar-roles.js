const { response } = require("express");

const adminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verficar el ROL sin recibir el Token'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol != 'ADMIN_ROLE') {
        return res.status(501).json({
            msg: `${ nombre } no es Administrador`
        });
    }

    next();
};

const tieneRole = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verficar el ROL sin recibir el Token'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles} `
            });
        }


        next();
    };

};


module.exports = {
    adminRole,
    tieneRole
};