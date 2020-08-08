console.log('JS loaded');

$(document).ready(handleReady);

function handleReady() {
    console.log('JQ loaded');
    // shows list of tasks
    getTasks();
    // submit click listener
    $('#submitTask').on('click', submitHandle);

}// end handleReady

function submitHandle() {
    console.log('submit click');

    //object for POST request
    const newTask = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        date_made: $('#dateIn').val()
    };
    
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function (response) {
        console.log('in POST request', response);
        
    }).catch(function (error) {
        console.log('ERROR in POST request', error);
        alert('Error with submitting task.')
    });
    
}

// get request for task list from db
function getTasks(){

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log('In GET:', response);
        $('#taskListOut').empty();
        for( let i = 0; i < response.length; i++) {
            let newTask = response[i];

            $('#taskListOut').append(`<li>${newTask.task}
            <button data-task-id="${newTask.id}" data-task-status="${newTask.status}" class="completeBtn">Complete</button>
            <button data-task-id="${newTask.id}" class="deleteBtn">Delete</button></li>
            <ul>
                <li>${newTask.notes}</li>
                <li>${newTask.date_made}</li>
            </ul>`);
    
        }
    }).catch(function(error) {
        console.log('error in GET request');
        alert('Error with GET request')
    });
}
