$(document).ready(function () {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskList));
        console.log("Current Task List:", taskList);
    }

    function renderTasks() {
        $('#taskList').empty();

        taskList.forEach((task, index) => {
            $('#taskList').append(`
                <li class="list-group-item task-item">
                    <span class="task-text">${task}</span>
                    <div>
                        <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
                    </div>
                </li>
            `);
        });
    }

    $('#addTaskBtn').click(function () {
        const newTask = $('#taskInput').val().trim();
        if (newTask !== '') {
            taskList.push(newTask);
            saveTasks();
            renderTasks();
            $('#taskInput').val('');
        } else {
            alert('Please enter a task!');
        }
    });

    $('#taskList').on('click', '.delete-btn', function () {
        const index = $(this).data('index');
        taskList.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    $('#taskList').on('click', '.edit-btn', function () {
        const index = $(this).data('index');
        const currentTask = taskList[index];
        const newTask = prompt("Edit your task:", currentTask);
        if (newTask !== null && newTask.trim() !== '') {
            taskList[index] = newTask.trim();
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
    console.log("Initial Task List:", taskList);
});
