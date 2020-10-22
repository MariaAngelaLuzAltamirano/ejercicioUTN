const Joi = require("@hapi/joi");

const schemas = {
    create: Joi.object().keys({
        nombre: Joi.string().min(3).max(30).required().messages({
            "any.required": "El campo nombre es obligatorio",
            "string.min": "El campo debe tener al menos 3 caracteres",
            "string.max": "El campo no debe superar 30 caracteres",
        }),
        apellido: Joi.string().min(3).max(30).required().messages({
            "any.required": "El campo apellido es obligatorio",
            "string.min": "El campo debe tener al menos 3 caracteres",
            "string.max": "El campo no debe superar 30 caracteres",
        }),
        correo: Joi.string().email().required().messages({
            "any.required": "El campo correo es obligatorio",
        }),
        password: Joi.string().required().messages({
            "any.required": "El campo password es obligatorio",
        }),
    })
};


module.exports = {schemas};