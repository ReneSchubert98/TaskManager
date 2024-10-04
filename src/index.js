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
        const updatedTasks = { ...prevTasks };
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
      const updatedTasks = { ...prevTasks };
      updatedTasks[currentWeek] = updatedTasks[currentWeek].filter(task => task.id !== taskId);
      return updatedTasks;
    });
  }

  function toggleStatus(taskId) {
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
  }

  function addSubtask(taskId) {
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
  }

  function toggleSubtaskStatus(taskId, subtaskId) {
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
  }

  function updateQuote() {
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
      "Wer aufhört, besser werden zu wollen, hört auf, gut zu sein.",
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
          placeholder="Suche nach Aufgaben..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button 
        onClick={() => setShowNewTaskForm(!showNewTaskForm)} 
        className="w-full bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        {showNewTaskForm ? 'Formular schließen' : 'Neue Aufgabe hinzufügen'}
      </button>
      {showNewTaskForm && (
    <div className="mb-4 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Neue Aufgabe</h3>
        <input
            type="text"
            placeholder="Feature-Nummer"
            value={newTask.feature}
            onChange={(e) => setNewTask({ ...newTask, feature: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
        />
        <textarea
            placeholder="Beschreibung"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
        />
        <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
        >
            <option value="Niedrig">Niedrig</option>
            <option value="Mittel">Mittel</option>
            <option value="Hoch">Hoch</option>
        </select>
        <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
        />
        <button onClick={addTask} className="w-full bg-blue-500 text-white px-4 py-2 rounded">
            Aufgabe hinzufügen
        </button>
    </div>
)}

<div className="space-y-4">
    {filteredTasks.map(task => (
        <div key={task.id} className={`p-4 rounded shadow task-card ${task.status === 'Erledigt' ? 'bg-green-100' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold">{task.feature}: {task.description}</h3>
            <p>Status: {task.status}</p>
            <p>Priorität: {task.priority}</p>
            <p>Fälligkeitsdatum: {task.dueDate}</p>
            <div className="mt-2 space-y-2">
                <button onClick={() => toggleStatus(task.id)} className="w-full bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    Status umschalten
                </button>
                <button onClick={() => deleteTask(task.id)} className="w-full bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Löschen
                </button>
                <button onClick={() => addSubtask(task.id)} className="w-full bg-purple-500 text-white px-2 py-1 rounded text-sm">
                    Unteraufgabe hinzufügen
                </button>
            </div>
            {task.subtasks.length > 0 && (
                <div className="mt-2">
                    <h4 className="font-semibold">Unteraufgaben:</h4>
                    <ul className="list-disc list-inside">
                        {task.subtasks.map(subtask => (
                            <li key={subtask.id} className="flex items-center justify-between">
                                <span className={subtask.status === 'Erledigt' ? 'line-through' : ''}>
                                    {subtask.description}
                                </span>
                                <button
                                    onClick={() => toggleSubtaskStatus(task.id, subtask.id)}
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
        {getOpenTasksFromPreviousWeeks().map(task => (
            <div key={task.id} className="p-2 bg-yellow-100 rounded">
                <p><strong>Woche {task.week}:</strong> {task.feature} - {task.description}</p>
            </div>
        ))}
    </div>
</div>

<div className="mt-4 p-4 bg-gray-100 rounded">
    <p className="text-center italic text-sm">{quote}</p>
</div>