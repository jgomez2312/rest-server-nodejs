const { Router } = require('express');
const { check } = require('express-validator');

const validarCampos = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { adminRole, tieneRole } = require('../middleware/validar-roles');


const { esRolValido, emailExiste, idExiste } = require('../helpers/db-validators');

const {
    getUsuario,
    putUsuario,
    postUsuario,
    deleteUsuario,
    patchUsuario
} = require('../controllers/usuarios');



const router = Router();

router.get('/', getUsuario);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom(esRolValido),
    validarCampos
], putUsuario);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password es obligatorio / tienen que tener mas de 6 caracteres').isLength({ min: 6 }),
    check('rol').custom(esRolValido),
    validarCampos
], postUsuario);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    //adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
], deleteUsuario);

router.patch('/', patchUsuario);


module.exports = router;