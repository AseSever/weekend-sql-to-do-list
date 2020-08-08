const express = require('express');
const pool = require('../modules/pool');
const taskRouter = express.Router();



// GET route
taskRouter.get('/', (req, res) => {
    let queryText = `
        SELECT * FROM "task_list" 
        ORDER BY "date_made" 	
        ;
        `;

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('ERROR in POST route:', error);
        res.sendStatus(500);
    });

});

taskRouter.post('/', (req, res) => {
    console.log('in POST route', req.body);
    let queryText = `
        INSERT INTO "task_list" ("task", "notes")
        VALUES ($1, $2);
        `
    let values = [req.body.task, req.body.notes];
    pool.query(queryText, values).then(result => {
        console.log('task router POST', result);
        res.sendStatus(200)
        
    }).catch(error => {
        console.log('ERROR in POST route', error);
        res.sendStatus(500);
    });
});



module.exports = taskRouter;