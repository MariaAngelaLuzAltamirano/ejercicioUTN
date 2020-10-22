const knex = require("knex")({
    client: "mysql",
  
    //aca van todos los datos de la base de datos para configuracion de ingreso es por unica vez
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      pool: { min: 1, max: 10 },
    },
});

module.exports = knex;