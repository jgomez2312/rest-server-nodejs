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

const idExiste = async(id) => {

    // Verificar que el correo existe
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El id: ${ id } no existe`);
    }
};
module.exports = {
    esRolValido,
    emailExiste,
    idExiste
};