const { body, validationResult } = require("express-validator");

const validateReclamo = [
    body("nombres_completos").notEmpty().withMessage("El nombre es obligatorio"),
    body("apellido_paterno").notEmpty().withMessage("El apellido paterno es obligatorio"),
    body("apellido_materno").notEmpty().withMessage("El apellido materno es obligatorio"),
    body("num_doc").isLength({ min: 8 }).withMessage("El documento debe tener al menos 8 caracteres"),
    body("correo").isEmail().withMessage("El correo no es válido"),
    body("celular").isLength({ min: 9 }).withMessage("El celular debe tener al menos 9 dígitos"),

    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateReclamo;
