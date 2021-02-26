const { validationResult } = require('express-validator');

const validarCampo = (req, res, next) => {

    // Respuesta de la Verificacion de posibles errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();

};

module.exports = validarCampo;