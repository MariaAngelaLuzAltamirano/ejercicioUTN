const {createUser} = require('./../models/registro');
const {send} = require('./../service/mail');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const {v4:uuid} = require('uuid');


//crear token
const publicKey = fs.readFileSync('./keys/public.pem');
const signOptions = {algorithm: 'RS256', expiresIn: '1h' };
const createToken = (payload) => jwt.sign(payload, publicKey, signOptions);


const create = async (obj) => {
 console.log(obj);
    try{ 
        const {nombre, apellido, correo, password} = obj;
        const uid = uuid();
        const user = {
            nombre,
            apellido,
            correo,
            password: sha1(password),
            uidCorreo : uid
        };
        const [idUsuario] = await createUser(user); //[]
        const token = createToken({id: idUsuario, uid: uid});
        const messageId = await send({
            to: correo,
            subject: 'Gracias Jon por el destructuring',
            html: `<h1> Hol@ ${nombre} ${apellido}, bienvenido a la app PEPITO <h1>
                    <a href= "${process.env.URL_CONFIRM}users/confirm?token=${token}">
                    <p> Siga el enlace para confirmar su cuenta <p>`
        });
        const respuesta = {id: idUsuario, codigoTransaccion: messageId}
        return respuesta;
    } catch (e){
        console.log(e)
    }

}

module.exports = {create};

