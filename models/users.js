const bd = require('./../utils/db');

const getInfo =(id, obj) => bd('usuarios').where({id}).select(obj);
const modifyUser =(id, obj) => bd('usuarios').where({id}).update(obj);

module.exports = {modifyUser, getInfo};