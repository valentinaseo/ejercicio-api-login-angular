// ejemplo básico para utilizar multer

// llamamos a las dependencias necesarias
const multer = require("multer");
const express = require("express");
const fs = require("fs");

// inicializando la aplicación de express
const app = express();

// especificamos un directorio de destino para almacenar los archivos
const upload = multer({dest:"uploads/"});

// definir la ruta HTTP que va a manejar la subida de archivos.
app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;

    //verificar que si se haya recibido un archivo
    if(!file){
        res.status(400).send("No se ha enviado ningún archivo");
        return;
    }
    
    // guardar el archivo en una ubicación especifica, capturando también el nombre
    const filePath = "uploads/" + file.filename;

    // nombrando el archivo y guardándolo
    fs.renameSync(file.path, filePath);
    
    // extraer informacion del fichero que vamos a subir
    const {originalname, mimetype, size} = file;
    res.send(`Archivo '${originalname}' subido exitosamente.\nTamaño: ${size} bytes.\nTipo MIME: ${mimetype}`);
});

// creación de un servidor
const port = 3000;
app.listen(port, () => {console.log("El servidor se ejecuta en http://localhost:" + port)});