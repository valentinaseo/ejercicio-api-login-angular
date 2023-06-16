//Se guarda en la constante express la libreria express
const express = require("express");
const cors = require("cors");

//Se guardan en la constante app todos los metodos de la libreria express
const app = express();

//Creacion de la constante puerto
const port = 3000;

//creacion de la constante connectDB

//creacion de la constante userRoutes
const userRoutes = require("./routes/userRoutes");

app.use(cors(
    {
        // origin: "http://localhost:4200",
        origin: "*"
    }
))
app.use(express.json());

//ruta para acceso a la informacion de la base de datos

app.use('/users', userRoutes);

app.listen(port, () => {console.log("El servidor se ejecuta en http://localhost:" + port)})
