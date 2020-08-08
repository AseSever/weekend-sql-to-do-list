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

})



module.exports = taskRouter;