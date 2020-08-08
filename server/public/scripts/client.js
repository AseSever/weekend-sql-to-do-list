console.log('JS loaded');

$(document).ready(handleReady);

function handleReady() {
    console.log('JQ loaded');
    // shows list of tasks
    getTasks();
}// end handleReady

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
            let $ul = $(`<li></li>`);
            $ul.append(`${newTask.task}`);
            $ul.append(`${newTask.notes}`);
            $ul.append(`${newTask.date_made}`);
            $ul.append(`${newTask.status}`);
    
            $('#taskListOut').append($ul);
        }
    }).catch(function(error) {
        console.log('error in GET request');
        alert('Error with GET request')
    });
}


// // appending to DOM function
// function showTasks(newTask) {

//     $('#taskListOut').empty();
//     for( let i = 0; i < newTask.length; i++) {
//         let newTask = newTask[i];

//         let $ul = $(`<li></li>`);
//         $ul.append(`${newTask.task}`);
//         $ul.append(`${newTask.notes}`);
//         $ul.append(`${newTask.date_made}`);
//         $ul.append(`${newTask.status}`);

//         $('#taskListOut').append($ul);
//     }
// } // end showTasks