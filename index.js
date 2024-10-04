import { openDB } from 'idb';

const dbPromise = openDB('task-manager-db', 1, {
    upgrade(db) {
        db.createObjectStore('tasks');
    },
});

const { useState, useEffect } = React;

async function saveTasksToIndexedDB(tasks) {
    const db = await dbPromise;
    await db.put('tasks', tasks, 'allTasks');
}

async function getTasksFromIndexedDB() {
    const db = await dbPromise;
    return await db.get('tasks', 'allTasks');
}

function TaskManager() {
    const [tasks, setTasks] = useState({});
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [newTask, setNewTask] = useState({ feature: '', description: '', priority: 'Niedrig', dueDate: '' });
    const [quote, setQuote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    useEffect(() => {
        async function loadTasks() {
            const storedTasks = await getTasksFromIndexedDB();
            if (storedTasks) {
                setTasks(storedTasks);
            }
        }
        loadTasks();
        updateQuote();
    }, []);

    useEffect(() => {
        saveTasksToIndexedDB(tasks);
    }, [tasks]);

    function getCurrentWeek() {
        const now = new Date();
        const onejan = new Date(now.getFullYear(), 0, 1);
        return Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }

    function addTask() {
        if (newTask.feature && newTask.description) {
            setTasks(prevTasks => {
                const updatedTasks = {...prevTasks};
                if (!updatedTasks[currentWeek]) {
                    updatedTasks[currentWeek] = [];
                }
                updatedTasks[currentWeek].push({
                    id: Date.now(),
                    ...newTask,
                    status: 'Offen',
                    subtasks: []
                });
                return updatedTasks;
            });
            setNewTask({ feature: '', description: '', priority: 'Niedrig', dueDate: '' });
            setShowNewTaskForm(false);
        }
    }

    function deleteTask(taskId) {
        setTasks(prevTasks => {
            const updatedTasks = {...prevTasks};
            updatedTasks[currentWeek] = updatedTasks[currentWeek].filter(task => task.id !== taskId);
            return updatedTasks;
        });
    }

    function toggleStatus(taskId) {
        setTasks(prevTasks => {
            const updatedTasks = {...prevTasks};
            const taskIndex = updatedTasks[currentWeek].findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                const task = updatedTasks[currentWeek][taskIndex];
                task.status = task.status === 'Offen' ? 'Erledigt' : 'Offen';
                if (task.status === 'Erledigt') {
                    task.subtasks.forEach(subtask => subtask.status = 'Erledigt');
                }
            }
            return updatedTasks;
        });
    }

    function addSubtask(taskId) {
        const subtaskDescription = prompt("Beschreibung der Unteraufgabe:");
        if (subtaskDescription) {
            setTasks(prevTasks => {
                const updatedTasks = {...prevTasks};
                const taskIndex = updatedTasks[currentWeek].findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    updatedTasks[currentWeek][taskIndex].subtasks.push({
                        id: Date.now(),
                        description: subtaskDescription,
                        status: 'Offen'
                    });
                }
                return updatedTasks;
            });
        }
    }

    function toggleSubtaskStatus(taskId, subtaskId) {
        setTasks(prevTasks => {
            const updatedTasks = {...prevTasks};
            const taskIndex = updatedTasks[currentWeek].findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                const subtaskIndex = updatedTasks[currentWeek][taskIndex].subtasks.findIndex(subtask => subtask.id === subtaskId);
                if (subtaskIndex !== -1) {
                    const subtask = updatedTasks[currentWeek][taskIndex].subtasks[subtaskIndex];
                    subtask.status = subtask.status === 'Offen' ? 'Erledigt' : 'Offen';
                    
                    const allSubtasksCompleted = updatedTasks[currentWeek][taskIndex].subtasks.every(st => st.status === 'Erledigt');
                    updatedTasks[currentWeek][taskIndex].status = allSubtasksCompleted ? 'Erledigt' : 'Offen';
                }
            }
            return updatedTasks;
        });
    }

    function updateQuote() {
        const quotes = [
            // Zitate hier...
        ];
        setQuote(quotes[currentWeek % quotes.length]);
    }

    function calculateProgress() {
        if (!tasks[currentWeek]) return 0;
        const totalItems = tasks[currentWeek].reduce((acc, task) => acc + 1 + task.subtasks.length, 0);
        const completedItems = tasks[currentWeek].reduce((acc, task) => {
            const completedSubtasks = task.subtasks.filter(st => st.status === 'Erledigt').length;
            return acc + (task.status === 'Erledigt' ? 1 : 0) + completedSubtasks;
        }, 0);
        return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    }

    function getOpenTasksFromPreviousWeeks() {
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
    }

    const filteredTasks = tasks[currentWeek] ? tasks[currentWeek].filter(task =>
        task.feature.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">ReDIX Task Manager</h1>
            
            <div className="mb-4 flex justify-between items-center">
                <button onClick={() => setCurrentWeek(prev => prev - 1)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    ← Vorherige
                </button>
                <h2 className="text-lg font-semibold">KW {currentWeek}</h2>
                <button onClick={() => setCurrentWeek(prev => prev + 1)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Nächste →
                </button>
            </div>

            <div className="mb-4 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Fortschritt</h3>
                <div className="w-full bg-gray-200 rounded">
                    <div
                        className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
                        style={{ width: `${calculateProgress()}%` }}
                    >
                        {calculateProgress().toFixed(1)}%
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Aufgabe suchen..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                {showNewTaskForm ? (
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">Neue Aufgabe hinzufügen</h3>
                        <input
                            type="text"
                            placeholder="Feature"
                            value={newTask.feature}
                            onChange={e => setNewTask({ ...newTask, feature: e.target.value })}
                            className="p-2 border border-gray-300 rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Beschreibung"
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            className="p-2 border border-gray-300 rounded mb-2 w-full"
                        />
                        <select
                            value={newTask.priority}
                            onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                            className="p-2 border border-gray-300 rounded mb-2 w-full"
                        >
                            <option value="Niedrig">Niedrig</option>
                            <option value="Mittel">Mittel</option>
                            <option value="Hoch">Hoch</option>
                        </select>
                        <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                            className="p-2 border border-gray-300 rounded mb-2 w-full"
                        />
                        <button onClick={addTask} className="bg-blue-500 text-white px-3 py-1 rounded">
                            Aufgabe hinzufügen
                        </button>
                        <button onClick={() => setShowNewTaskForm(false)} className="ml-2 text-gray-600">
                            Abbrechen
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setShowNewTaskForm(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
                        Neue Aufgabe
                    </button>
                )}
            </div>

            {filteredTasks.length > 0 ? (
                <div className="bg-white rounded shadow p-4">
                    {filteredTasks.map(task => (
                        <div key={task.id} className="task-card border-b py-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold">{task.feature} - {task.description}</h4>
                                    <p className="text-gray-600">Priorität: {task.priority} | Fällig am: {task.dueDate}</p>
                                    <p className="text-gray-500">Status: {task.status}</p>
                                </div>
                                <div>
                                    <button onClick={() => toggleStatus(task.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                                        {task.status === 'Offen' ? 'Erledigen' : 'Zurücksetzen'}
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                                        Löschen
                                    </button>
                                    <button onClick={() => addSubtask(task.id)} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">
                                        Unteraufgabe hinzufügen
                                    </button>
                                </div>
                            </div>
                            {task.subtasks.length > 0 && (
                                <div className="mt-2 ml-4">
                                    {task.subtasks.map(subtask => (
                                        <div key={subtask.id} className="flex justify-between items-center border-b py-1">
                                            <p className={`text-gray-700 ${subtask.status === 'Erledigt' ? 'line-through' : ''}`}>
                                                {subtask.description} (Status: {subtask.status})
                                            </p>
                                            <button onClick={() => toggleSubtaskStatus(task.id, subtask.id)} className="bg-gray-300 px-2 py-1 rounded">
                                                {subtask.status === 'Offen' ? 'Erledigt' : 'Zurücksetzen'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Keine Aufgaben für diese Woche.</p>
            )}

            <div className="mt-4 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold">Offene Aufgaben aus vergangenen Wochen</h3>
                <ul>
                    {getOpenTasksFromPreviousWeeks().map(task => (
                        <li key={task.id} className="py-1">
                            KW {task.week}: {task.feature} - {task.description} (Status: {task.status})
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold">Zitat der Woche</h3>
                <p>{quote}</p>
            </div>
        </div>
    );
}

ReactDOM.render(<TaskManager />, document.getElementById('root'));