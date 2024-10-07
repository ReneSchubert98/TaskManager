const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

// MongoDB-Verbindung
const uri = "mongodb+srv://reneschubert1998:uMo1vVJe6YVnOLh8@taskmanager.jl0pl.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Erfolgreich mit MongoDB verbunden!"))
    .catch(err => console.error("Fehler bei der Verbindung zur MongoDB:", err));

// Definiere das Schema und das Modell für Aufgaben
const taskSchema = new mongoose.Schema({
    feature: String,
    description: String,
    priority: String,
    dueDate: String,
    status: String,
    subtasks: Array
});

const Task = mongoose.model('Task', taskSchema);

// API-Endpunkt zum Speichern von Aufgaben
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send('Aufgabe gespeichert!');
});

// API-Endpunkt zum Abrufen von Aufgaben
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Starte den Server
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});