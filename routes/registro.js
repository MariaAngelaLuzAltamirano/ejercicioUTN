const express = require('express');
const router = express.Router();
const service = require('./../service/registro');
const {validateCreate} = require('./../middleware/registro');


const create = (req, res) => {
        console.log(req.body);
        service.create(req.body)
        .then((respuesta) => {
                console.log(respuesta);
                res.json({respuesta,message: "Usuario Creado Exitosamente"})
        })
        .catch(e =>{
                console.log(e);
                res.status(500).json(e)
        });
}
        

router.post('/create', validateCreate, create)


module.exports = router;
