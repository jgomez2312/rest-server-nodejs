const Role = require('../models/rol');
const Usuario = require('../models/usuario');


const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol: ${ rol } no esta permitido`);
    }
};

const emailExiste = async(correo = '') => {

    // Verificar que el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya existe`);
    }
};

module.exports = {
    esRolValido,
    emailExiste
};