const filePath = "./Notificacion.json";
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
app.get("/notifications", (req, res) => {
    const data = readData();
    res.json(data.notifications);
});

app.get("/notifications/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notification = data.notifications.find((notification) => notification.id === id);
    res.json(notification);
});

//Creem un endpoint del tipus post per afegir una notificació
app.post("/notifications", (req, res) => {
    const data = readData();
    const body = req.body;
    const newNotification = {
        id: data.notifications.length + 1,
        ...body,
    };
    data.notifications.push(newNotification);
    writeData(data);
    res.json(newNotification);
});

// Update
app.put("/notifications/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificationIndex = data.notifications.findIndex((notification) => notification.id === id);
    data.notifications[notificationIndex] = {
        ...data.notifications[notificationIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Notification updated successfully" });
});

//Creem un endpoint per eliminar una notificació
app.delete("/notifications/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const notificationIndex = data.notifications.findIndex((notification) => notification.id === id);
    data.notifications.splice(notificationIndex, 1);
    writeData(data);
    res.json({ message: "Notification deleted successfully" });
});

//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});