// Check if user is logged in
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
if (!isLoggedIn) {
    const username = prompt('Bitte geben Sie Ihren Benutzernamen ein:');
    if (username) {
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true');
    } else {
        alert('Benutzername wird benötigt!');
        window.location.reload();
    }
}

const username = localStorage.getItem('username');
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(username)) || [];
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.classList.toggle('done', task.done);
        li.addEventListener('click', () => {
            task.done = !task.done;
            saveTasks();
            loadTasks();
        });
        taskList.appendChild(li);
    });
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [...taskList.children].map(li => ({
        text: li.textContent,
        done: li.classList.contains('done')
    }));
    localStorage.setItem(username, JSON.stringify(tasks));
}

// Add task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value;
    const newTask = { text: taskText, done: false };
    const tasks = JSON.parse(localStorage.getItem(username)) || [];
    tasks.push(newTask);
    localStorage.setItem(username, JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
});

// Initial load
loadTasks();