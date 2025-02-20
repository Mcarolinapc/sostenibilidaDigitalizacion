const filePath = "./Recurso.json";
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
app.get("/recursos", (req, res) => {
    const data = readData();
    res.json(data.recursos);
});

app.get("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.id === id);
    res.json(recurso);
});

//Creem un endpoint del tipus post per afegir un recurs
app.post("/recursos", (req, res) => {
    const data = readData();
    const body = req.body;
    const newRecurso = {
        id: data.recursos.length + 1,
        ...body,
    };
    data.recursos.push(newRecurso);
    writeData(data);
    res.json(newRecurso);
});

// Update
app.put("/recursos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id === id);
    data.recursos[recursoIndex] = {
        ...data.recursos[recursoIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Recurso updated successfully" });
});

//Creem un endpoint per eliminar un recurs
app.delete("/recursos/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id === id);
    data.recursos.splice(recursoIndex, 1);
    writeData(data);
    res.json({ message: "Recurso deleted successfully" });
});

//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});