const express = require('express');
const pool = require('../modules/pool');
const taskRouter = express.Router();



// GET route
taskRouter.get('/', (req, res) => {
    let queryText = `
        SELECT * FROM "task_list"
        ORDER BY "task";
        `;

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('ERROR in POST route:', error);
        res.sendStatus(500);
    });

});

//post route sends data to DB
taskRouter.post('/', (req, res) => {
    console.log('in POST route', req.body);
    let queryText = `
        INSERT INTO "task_list" ("task", "notes")
        VALUES ($1, $2);
        `
    // setting values for clarity
    let values = [req.body.task, req.body.notes];
    pool.query(queryText, values).then(result => {
        console.log('task router POST', result);
        res.sendStatus(200)
        
    }).catch(error => {
        console.log('ERROR in POST route', error);
        res.sendStatus(500);
    });
});

//delete route 
taskRouter.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('delete route id:', id);
    
    let queryText = `
        DELETE FROM "task_list"
        WHERE "id" = $1;
    `
    pool.query(queryText, [id]).then(result => {
        console.log(result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('ERROR in DELETE route', error);
        res.sendStatus(500);
    });
    
});

//PUT route
taskRouter.put('/:id', (req, res) => {
    console.log('In PUT', req.body, req.params.id);
    const queryText = `
        UPDATE "task_list" 
        SET "status" = $1 
        WHERE id = $2
        `
    // setting values for clarity around completeing tasks
    const values = [req.body.newStatus, req.params.id];
    
    pool.query(queryText, values).then(result => {
        console.log(result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('ERROR in PUT route', error);
        res.sendStatus(500);
    }); 
});



module.exports = taskRouter;