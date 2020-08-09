console.log('JS loaded');

$(document).ready(handleReady);

function handleReady() {
    console.log('JQ loaded');
    // shows list of tasks
    getTasks();
    // submit click listener
    $('#submitTask').on('click', submitHandle);
    // delete click listener
    $('#outputDiv').on('click', '.deleteBtn', deleteHandle);
    //toggle complete task 
    $('#outputDiv').on('click', '.completeBtn', taskToggleComplete);

}// end handleReady

//toggle complete task function
function taskToggleComplete() {
    console.log('complete clicked');
    const id = $(this).data('task-id');
    const status = $(this).data('task-status');
    console.log(id, status);

    // PUT request -- status = complete or not
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: { newStatus: !status }
    }).then(function (response) {
        console.log('in PUT', response);
        getTasks();
    }).catch(function (error) {
        console.log('ERROR in PUT request', error);
    });
}

// to delete our tasks
function deleteHandle() {
    console.log('delete clicked');
    let taskToDelete = $(this).data('task-id')
    console.log(taskToDelete);
    // delete rquest
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskToDelete}`
    }).then(function (response) {
        console.log('in delete request', response);
        getTasks();
    }).catch(function (error) {
        console.log('ERROR ind DELETE request', error);
    });
}// end deleteHandle

function submitHandle() {
    console.log('submit click');

    //object for POST request
    const newTask = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
    };
    // POST request
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function (response) {
        console.log('in POST request', response);
        //empty DOM
        $('#taskIn').val('');
        $('#notesIn').val('');

        //appending new info
        getTasks();
    }).catch(function (error) {
        console.log('ERROR in POST request', error);
        alert('Error with submitting task.')
    });

}// end submit handle

// get request for task list from db
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('In GET:', response);
        $('#taskListOut').empty();
        for (let i = 0; i < response.length; i++) {
            let newTask = response[i];

            //if status is true will give background color to html
            if (newTask.status === true) {
                $('#taskListOut').append(`<div class="complete-task"><li class="task-todo">${newTask.task}
            <button data-task-id="${newTask.id}" data-task-status="${newTask.status}" class="completeBtn">&check;</button>
            <button data-task-id="${newTask.id}" class="deleteBtn">Delete</button></li>
            <ul class="task-info">
                <li>${newTask.notes}</li>
                <li>${newTask.date_made}</li>
            </ul></div>`);
            //if status is false will not give background color to html
            } else if (newTask.status === false){
                $('#taskListOut').append(`<div><li class="task-todo">${newTask.task}
            <button data-task-id="${newTask.id}" data-task-status="${newTask.status}" class="completeBtn">&check;</button>
            <button data-task-id="${newTask.id}" class="deleteBtn">Delete</button></li>
            <ul class="task-info">
                <li>${newTask.notes}</li>
                <li>${newTask.date_made}</li>
            </ul></div>`);
            }
        }// for loop 

    }).catch(function (error) {
        console.log('error in GET request');
        alert('Error with server request')
    });
}// end getTasks
