const { useState, useEffect, useCallback } = React;

// API-URL
const API_URL = "http://localhost:5001/";

// Utility functions
const getCurrentWeek = () => {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

const calculateProgress = (tasks, currentWeek) => {
    if (!tasks[currentWeek]) return 0;
    const totalItems = tasks[currentWeek].reduce((acc, task) => acc + 1 + (task.subtasks ? task.subtasks.length : 0), 0);
    const completedItems = tasks[currentWeek].reduce((acc, task) => {
        const completedSubtasks = task.subtasks ? task.subtasks.filter(st => st.status === 'Erledigt').length : 0;
        return acc + (task.status === 'Erledigt' ? 1 : 0) + completedSubtasks;
    }, 0);
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
};

// Custom hooks
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};

const useNotification = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const notify = useCallback((message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    }, []);

    return { showNotification, notificationMessage, notify };
};

const getOpenTasksFromPreviousWeeks = (tasks, currentWeek) => {
    const openTasks = [];
    for (let week in tasks) {
        if (parseInt(week) < currentWeek) {
            tasks[week].forEach(task => {
                if (task.status === 'Offen') {
                    openTasks.push({ ...task, week: parseInt(week) });
                }
            });
        }
    }
    return openTasks;
};

// Main component
function TaskManager() {
    const [tasks, setTasks] = useLocalStorage('tasks', {});
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [newTask, setNewTask] = useState({ feature: '', description: '', priority: 'Niedrig', dueDate: '' });
    const [quote, setQuote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { showNotification, notificationMessage, notify } = useNotification();

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setTasks(prevTasks => ({ ...prevTasks, [currentWeek]: data }));
            } else {
                console.error('Fehler beim Abrufen der Aufgaben:', response.statusText);
            }
        }
        fetchTasks();
        updateQuote();
    }, [currentWeek]);

    const addTask = useCallback(async (e) => {
        e.preventDefault();
        if (newTask.feature && newTask.description) {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            
            if (response.ok) {
                const task = await response.json();
                setTasks(prevTasks => {
                    const updatedTasks = { ...prevTasks };
                    if (!updatedTasks[currentWeek]) {
                        updatedTasks[currentWeek] = [];
                    }
                    updatedTasks[currentWeek].push(task);
                    return updatedTasks;
                });
                notify('Aufgabe erfolgreich hinzugefügt');
            } else {
                console.error('Fehler beim Hinzufügen der Aufgabe:', await response.text());
            }
        }
    }, [newTask, currentWeek, notify]);

    const deleteTask = useCallback(async (taskId) => {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
        if (response.ok) {
            setTasks(prevTasks => {
                const updatedTasks = { ...prevTasks };
                updatedTasks[currentWeek] = updatedTasks[currentWeek].filter(task => task._id !== taskId);
                return updatedTasks;
            });
            notify('Aufgabe gelöscht');
        } else {
            console.error('Fehler beim Löschen der Aufgabe:', await response.text());
        }
    }, [currentWeek, notify]);
    
    const toggleStatus = useCallback(async (taskId) => {
        const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, { method: 'PATCH' });
        if (response.ok) {
            const updatedTask = await response.json();
            setTasks(prevTasks => {
                const updatedTasks = { ...prevTasks };
                const taskIndex = updatedTasks[currentWeek].findIndex(task => task._id === taskId);
                if (taskIndex !== -1) {
                    updatedTasks[currentWeek][taskIndex] = updatedTask;
                }
                return updatedTasks;
            });
        } else {
            console.error('Fehler beim Umschalten des Status:', await response.text());
        }
    }, [currentWeek]);
    
    const addSubtask = useCallback(async (taskId) => {
        const subtaskDescription = prompt("Beschreibung der Unteraufgabe:");
        if (subtaskDescription) {
            const response = await fetch(`${API_URL}/tasks/${taskId}/subtasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: subtaskDescription }),
            });
    
            if (response.ok) {
                const updatedTask = await response.json();
                setTasks(prevTasks => {
                    const updatedTasks = { ...prevTasks };
                    const taskIndex = updatedTasks[currentWeek].findIndex(task => task._id === taskId);
                    if (taskIndex !== -1) {
                        updatedTasks[currentWeek][taskIndex] = updatedTask;
                    }
                    return updatedTasks;
                });
                notify('Unteraufgabe hinzugefügt');
            } else {
                console.error('Fehler beim Hinzufügen der Unteraufgabe:', await response.text());
            }
        }
    }, [currentWeek, notify]);
    
    const toggleSubtaskStatus = useCallback(async (taskId, subtaskId) => {
        if (!subtaskId) {
            console.error('Subtask ID ist undefined');
            return;
        }
    
        // Stelle sicher, dass die API-URL korrekt ist
        const response = await fetch(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}/toggle`, { method: 'PATCH' });
        
        if (response.ok) {
            const updatedTask = await response.json();
            setTasks(prevTasks => {
                const updatedTasks = { ...prevTasks };
                const taskIndex = updatedTasks[currentWeek].findIndex(task => task._id === taskId);
                if (taskIndex !== -1) {
                    updatedTasks[currentWeek][taskIndex] = updatedTask;
                }
                return updatedTasks;
            });
        } else {
            const errorMessage = await response.text(); // Hole die Fehlermeldung
            console.error('Fehler beim Umschalten des Status der Unteraufgabe:', errorMessage);
        }
    }, [currentWeek]);

    const updateQuote = useCallback(() => {
        const quotes = [
            "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.",
            "Erfolg ist nicht final, Misserfolg ist nicht fatal: Es ist der Mut weiterzumachen, der zählt.",
            "Die einzige Begrenzung zur Verwirklichung von morgen sind unsere Zweifel von heute.",
            "Der Weg zum Erfolg ist die Beharrlichkeit des Handelns.",
            "Glaube an dich selbst und alles ist möglich.",
            "Jeder Fortschritt beginnt mit der Entscheidung, es zu versuchen.",
            "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.",
            "Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was man tut.",
            "Erfolg ist die Summe kleiner Anstrengungen, die täglich wiederholt werden.",
            "Wer aufhört, besser werden zu wollen, hört auf, gut zu sein."
        ];
        setQuote(quotes[currentWeek % quotes.length]);
    }, [currentWeek]);

    const filteredTasks = tasks[currentWeek] ? tasks[currentWeek].filter(task =>
        (task.feature && task.feature.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">ReDIX Task Manager</h1>
            
            <div className="mb-4 flex justify-between items-center">
            <button onClick={() => setCurrentWeek(prev => prev - 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Vorherige Woche
                </button>
                <h2 className="text-xl font-semibold">Kalenderwoche {currentWeek}</h2>
                <button onClick={() => setCurrentWeek(prev => prev + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Nächste Woche
                </button>
            </div>

            <div className="mb-4 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Neue Aufgabe</h3>
                <input
                    type="text"
                    placeholder="Feature-Nummer"
                    value={newTask.feature}
                    onChange={(e) => setNewTask({...newTask, feature: e.target.value})}
                    className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                    placeholder="Beschreibung"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="w-full p-2 mb-2 border rounded"
                />
                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full p-2 mb-2 border rounded"
                >
                    <option value="Niedrig">Niedrig</option>
                    <option value="Mittel">Mittel</option>
                    <option value="Hoch">Hoch</option>
                </select>
                <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full p-2 mb-2 border rounded"
                />
                <button onClick={addTask} className="w-full bg-green-500 text-white px-4 py-2 rounded">
                    Aufgabe hinzufügen
                </button>
            </div>

            <div className="mb-4 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Fortschritt</h3>
                <div className="w-full bg-gray-200 rounded">
                    <div
                        className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
                        style={{ width: `${calculateProgress(tasks, currentWeek)}%` }}
                    >
                        {calculateProgress(tasks, currentWeek).toFixed(1)}%
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Suche nach Aufgaben..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="space-y-4">
                {filteredTasks.map(task => (
                    <div key={task._id} className={`p-4 rounded shadow ${task.status === 'Erledigt' ? 'bg-green-100' : 'bg-white'}`}>
                        <h3 className="text-lg font-semibold">{task.feature}: {task.description}</h3>
                        <p>Status: {task.status}</p>
                        <p>Priorität: {task.priority}</p>
                        <p>Fälligkeitsdatum: {task.dueDate}</p>
                        <div className="mt-2 space-x-2">
                            <button onClick={() => toggleStatus(task._id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                Status umschalten
                            </button>
                            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                Löschen
                            </button>
                            <button onClick={() => addSubtask(task._id)} className="bg-purple-500 text-white px-2 py-1 rounded">
                                Unteraufgabe hinzufügen
                            </button>
                        </div>
                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mt-2">
                                <h4 className="font-semibold">Unteraufgaben:</h4>
                                <ul className="list-disc list-inside">
                                    {task.subtasks.map(subtask => (
                                        <li key={subtask._id} className="flex items-center">
                                            <span className={subtask.status === 'Erledigt' ? 'line-through' : ''}>
                                                {subtask.description}
                                            </span>
                                            <button
                                                onClick={() => toggleSubtaskStatus(task._id, subtask._id)}
                                                className="ml-2 bg-gray-300 text-gray-800 px-2 py-1 rounded text-sm"
                                            >
                                                {subtask.status === 'Erledigt' ? 'Wiedereröffnen' : 'Erledigt'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Offene Aufgaben aus vorherigen Wochen</h3>
                <div className="space-y-2">
                    {getOpenTasksFromPreviousWeeks(tasks, currentWeek).map(task => (
                        <div key={task._id} className="p-2 bg-yellow-100 rounded">
                            <p><strong>Woche {task.week}:</strong> {task.feature} - {task.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-center italic">{quote}</p>
            </div>

            {showNotification && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {notificationMessage}
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<TaskManager />, document.getElementById('root'));