const { Router } = require('express');
const { check } = require('express-validator');

const validarCampo = require('../middleware/validar-campos');
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
    validarCampo
], putUsuario);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password es obligatorio / tienen que tener mas de 6 caracteres').isLength({ min: 6 }),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampo
], postUsuario);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExiste),
    validarCampo
], deleteUsuario);

router.patch('/', patchUsuario);


module.exports = router;