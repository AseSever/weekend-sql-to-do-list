// const { default: swal } = require("sweetalert");

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
    const id = $(this).data('task-id'); // targeting chosen id
    const status = $(this).data('task-status'); // targeting chosen status --true or false
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
} // end

// to delete our tasks
function deleteHandle() {
    console.log('delete clicked');
    let taskToDelete = $(this).data('task-id')
    console.log(taskToDelete);

    swal({
        title: "Are you sure?",
        text: "You'll have to do it eventually...",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: 'No',
    }).then((willDelete) => {
        if (willDelete) {
            swal("Task deleted", {
                icon: "success",
            });
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
        } else {
            swal("Task survives another day.");
        }

    })// end sweet alert

}// end deleteHandle

function submitHandle() {
    console.log('submit click');

    //object for POST request
    const newTask = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
    };

    if (newTask.task === '' || newTask === '') {
        swal("Oops!", "Please add a task and note", "error")
    } else {
        // POST request
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: newTask
        }).then(function (response) {
            console.log('in POST request', response);
            //empty DOM inputs
            $('#taskIn').val('');
            $('#notesIn').val('');
            //appending new info
            getTasks();
        }).catch(function (error) {
            console.log('ERROR in POST request', error);
            alert('Error with submitting task.')
        });
    }// end conditional if fields are empty

}// end submit handle

// GET request for task list from db
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('In GET:', response);
        appendTasks(response);
    }).catch(function (error) {
        console.log('error in GET request');
        alert('Error with server request')
    });
}// end getTasks

// append data function
function appendTasks(addTasks) {
    $('#taskListOut').empty();
    for (let i = 0; i < addTasks.length; i++) {
        let newTask = addTasks[i];

        //if status is true will give background color to html
        if (newTask.status === true) {
            $('#taskListOut').append(`<div>
            <li class="list-group-item list-group-item-action list-group-item-success task-todo">${newTask.task}
        <button data-task-id="${newTask.id}" data-task-status="${newTask.status}" class="completeBtn btn btn-outline-success">&check;</button>
        <button data-task-id="${newTask.id}" class="deleteBtn btn btn-danger btn-sm float-right">Delete</button></li>
            <li class="list-group-item list-group-item-action list-group-item-success">${newTask.notes}</li>
            <li class="list-group-item list-group-item-action list-group-item-success">${newTask.date_made}</li>
        </div>`);
            //if status is false will not give background color to html
        } else if (newTask.status === false) {
            $('#taskListOut').append(`<div>
            <li class="list-group-item list-group-item-action list-group-item-light task-todo">${newTask.task}
        <button data-task-id="${newTask.id}" data-task-status="${newTask.status}" class="completeBtn btn btn-outline-success">&check;</button>
        <button data-task-id="${newTask.id}" class="deleteBtn btn btn-danger btn-sm float-right">Delete</button></li>
            <li class="list-group-item list-group-item-action list-group-item-light">${newTask.notes}</li>
            <li class="list-group-item list-group-item-action list-group-item-light">${newTask.date_made}</li>
        </div>`);
        }// end conditional for toggleing complete
        // I tried many a way to addClass after click and was really
        // stumbling around.  So this was my work-around atm and I hate
        // all this text 
    }// for loop 
} // end appendTasks