const filePath = "./Usuario.json";
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.send("Welcome to my first API with Node.js");
});

//creamos un end point
app.get("/usuarios", (req, res) => {
    const data = readData();
    res.json(data.usuarios);
});

app.get("/usuarios/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const usuario = data.usuarios.find((usuario) => usuario.id === id);
    res.json(usuario);
});

//Creem un endpoint del tipus post per afegir un usuari
app.post("/usuarios", (req, res) => {
    const data = readData();
    const body = req.body;
    const newUsuario = {
        id: data.usuarios.length + 1,
        ...body,
    };
    data.usuarios.push(newUsuario);
    writeData(data);
    res.json(newUsuario);
});

// Update
app.put("/usuarios/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id === id);
    data.usuarios[usuarioIndex] = {
        ...data.usuarios[usuarioIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Usuario updated successfully" });
});

//Creem un endpoint per eliminar un usuari
app.delete("/usuarios/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id === id);
    data.usuarios.splice(usuarioIndex, 1);
    writeData(data);
    res.json({ message: "Usuario deleted successfully" });
});

//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});