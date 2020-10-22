const bd = require('./../utils/db');

const createUser = (obj) => bd('usuarios').insert(obj);


module.exports = {createUser};