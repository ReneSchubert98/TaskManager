const { useState, useEffect, useCallback } = React;

// Utility functions
const getCurrentWeek = () => {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

const calculateProgress = (tasks, currentWeek) => {
    if (!tasks[currentWeek]) return 0;
    const totalItems = tasks[currentWeek].reduce((acc, task) => acc + 1 + task.subtasks.length, 0);
    const completedItems = tasks[currentWeek].reduce((acc, task) => {
        const completedSubtasks = task.subtasks.filter(st => st.status === 'Erledigt').length;
        return acc + (task.status === 'Erledigt' ? 1 : 0) + completedSubtasks;
    }, 0);
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
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
    const [tasks, setTasks] = useState({});
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [newTask, setNewTask] = useState({ feature: '', description: '', priority: 'Niedrig', dueDate: '' });
    const [quote, setQuote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        updateQuote();
    }, [currentWeek]);

    const addTask = useCallback(() => {
        if (newTask.feature && newTask.description) {
            setTasks(prevTasks => {
                const updatedTasks = { ...prevTasks };
                if (!updatedTasks[currentWeek]) {
                    updatedTasks[currentWeek] = [];
                }
                updatedTasks[currentWeek].push({
                    ...newTask,
                    id: Date.now(),
                    status: 'Offen',
                    subtasks: []
                });
                return updatedTasks;
            });
            setNewTask({ feature: '', description: '', priority: 'Niedrig', dueDate: '' });
        }
    }, [newTask, currentWeek]);

    const deleteTask = useCallback((taskId) => {
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[currentWeek] = updatedTasks[currentWeek].filter(task => task.id !== taskId);
            return updatedTasks;
        });
    }, [currentWeek]);

    const toggleStatus = useCallback((taskId) => {
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
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
    }, [currentWeek]);

    const addSubtask = useCallback((taskId) => {
        const subtaskDescription = prompt("Beschreibung der Unteraufgabe:");
        if (subtaskDescription) {
            setTasks(prevTasks => {
                const updatedTasks = { ...prevTasks };
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
    }, [currentWeek]);

    const toggleSubtaskStatus = useCallback((taskId, subtaskId) => {
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
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
    }, [currentWeek]);

    const updateQuote = useCallback(() => {
        const quotes = [
            "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.",
            "Erfolg ist nicht final, Misserfolg ist nicht fatal: Es ist der Mut weiterzumachen, der zählt.",
            "Die einzige Begrenzung zur Verwirklichung von morgen sind unsere Zweifel von heute.",
            "Der Weg zum Erfolg ist die Beharrlichkeit des Handelns.",
            "Glaube an dich selbst und alles ist möglich."
        ];
        setQuote(quotes[currentWeek % quotes.length]);
    }, [currentWeek]);

    const filteredTasks = tasks[currentWeek] ? tasks[currentWeek].filter(task =>
        task.feature.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">ReDIX Task Manager</h1>
            <div className="mb-4 flex justify-between items-center">
                <button onClick={() => setCurrentWeek(prev => prev - 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Vorherige Woche
                </button>
                <button onClick={() => setCurrentWeek(prev => prev + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Nächste Woche
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<TaskManager />, document.getElementById('root'));