const filePath = "./Reserva.json";
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
app.get("/reservas", (req, res) => {
    const data = readData();
    res.json(data.reservas);
});

app.get("/reservas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reserva = data.reservas.find((reserva) => reserva.id === id);
    res.json(reserva);
});

//Creem un endpoint del tipus post per afegir una reserva
app.post("/reservas", (req, res) => {
    const data = readData();
    const body = req.body;
    const newReserva = {
        id: data.reservas.length + 1,
        ...body,
    };
    data.reservas.push(newReserva);
    writeData(data);
    res.json(newReserva);
});

// Update
app.put("/reservas/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id === id);
    data.reservas[reservaIndex] = {
        ...data.reservas[reservaIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Reserva updated successfully" });
});

//Creem un endpoint per eliminar una reserva
app.delete("/reservas/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id === id);
    data.reservas.splice(reservaIndex, 1);
    writeData(data);
    res.json({ message: "Reserva deleted successfully" });
});

//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});