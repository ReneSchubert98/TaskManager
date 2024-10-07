const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

// Route für die Root-URL
app.get('/', (req, res) => {
    res.send('Willkommen beim Task Manager API!');
});

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
    res.json({ message: 'Aufgabe gespeichert!' }); // Hier als JSON zurückgeben
});

// API-Endpunkt zum Abrufen von Aufgaben
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks); // Tasks werden als JSON zurückgegeben
});

// API-Endpunkt zum Umschalten des Status einer Aufgabe
app.patch('/tasks/:id/toggle', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send('Aufgabe nicht gefunden!');
        }

        task.status = task.status === 'Offen' ? 'Erledigt' : 'Offen';
        await task.save();
        res.json(task);
    } catch (error) {
        console.error("Fehler beim Umschalten des Status:", error);
        res.status(500).send('Interner Serverfehler');
    }
});

// API-Endpunkt zum Löschen einer Aufgabe
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(204).send(); // Erfolgreiche Löschung ohne Rückgabewert
    } catch (error) {
        res.status(404).json({ message: "Aufgabe nicht gefunden" });
    }
});

// API-Endpunkt zum Hinzufügen einer Unteraufgabe
app.post('/tasks/:id/subtasks', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body; // Stelle sicher, dass du die Beschreibung hier bekommst
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Aufgabe nicht gefunden" });
        }
        task.subtasks.push({ description, status: 'Offen' });
        await task.save();
        res.json(task); // Rückgabe der aktualisierten Aufgabe
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Hinzufügen der Unteraufgabe" });
    }
});

// API-Endpunkt zum Umschalten des Status der Unteraufgabe
app.patch('/tasks/:taskId/subtasks/:subtaskId/toggle', async (req, res) => {
    try {
        const { taskId, subtaskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Aufgabe nicht gefunden' });
        }

        const subtask = task.subtasks.id(subtaskId);
        if (!subtask) {
            return res.status(404).json({ message: 'Unteraufgabe nicht gefunden' });
        }

        // Toggle the status of the subtask
        subtask.status = subtask.status === 'Offen' ? 'Erledigt' : 'Offen';
        await task.save();

        res.json(task); // Gibt die aktualisierte Aufgabe zurück
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Umschalten des Status', error });
    }
});

// Starte den Server
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});