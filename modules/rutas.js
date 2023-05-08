//Modulo que resuelve las rutas de las API REST
// ARQUITECTURA RESTFUL
//Recordar: la api rest trabaja con los verbos HTTP
//  GET, POST, PUT, DELETE, PATCH ...
// Crearemos los endpoints para cada verbo

// paquetes requeridos

const express = require('express');
const cors = require('cors'); // para evitar restricciones entre llamadas de sitios
const ruta = express.Router();  // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require('./bdatos');
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors


//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
ruta.use(express.json()); //serializa la data en JSON
ruta.use(cors());
ruta.options('*', cors());



// construimos los endpoint
// listar todos usamos el GET

ruta.get('/api/users', (req, res) => {
    conex.query("SELECT * FROM users", (error, respuesta) => {
        if (error) {
            throw error;
        } else {
            res.send(respuesta)
        }
    });
})

// insertar un registro

ruta.post('/api/users', (req, res) => {
    let data = {
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone
    }
    conex.query("INSERT INTO users set ?", data, (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201).send(respuesta)
        }
    });
})
// editar

ruta.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let datos = {
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone
    };
    conex.query("UPDATE users SET  ? where id = ?", [datos, id]), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201)
            //  res.status(201).send(respuesta)
        }
    }

})
//borrar

ruta.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;
    /*   let datos = {
          name: req.body.name,
          lastName: req.body.lastName,
          phone: req.body.phone
      }; */
    conex.query("DELETE FROM users where id = ?", id), (error, respuesta) => {
        if (error) {
            console.log(error);
        } else {
            //res.status(201)
            res.status(201).send(respuesta)
        }
    }

})

module.exports = ruta





