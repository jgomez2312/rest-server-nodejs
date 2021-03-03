const { Router } = require('express');
const { check } = require('express-validator');

const validarCampo = require('../middleware/validar-campos');

const { login } = require('../controllers/auth');



const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampo
], login);


module.exports = router;