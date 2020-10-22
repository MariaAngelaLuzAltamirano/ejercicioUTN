var express = require('express');
var router = express.Router();
const service = require('./../models/users');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('./keys/private.pem');

const confirm = async (req, res) => {
  const token = req.query.token;
  const {id, uid} = await jwt.verify(token, privateKey, { algorithms: ['RS256']});
  try{
    const [verificacionUid] = await service.getInfo(id, 'uidCorreo');
    console.log(verificacionUid.uidCorreo);
    if(verificacionUid.uidCorreo === uid){
      service.modifyUser(id, {'habilitado': true})
        .then((respuesta) => res.json({respuesta, message: "Cuenta confirmada"}))
        .catch(e => res.status(500).json(e));
    }else{
      res.status(401).json({message:"URL invalida"})
    }
  }catch(e){
    res.sendStatus(500)
  }
}

router.get('/confirm', confirm);

module.exports = router;
