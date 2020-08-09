const pg = require('pg')
const Pool = pg.Pool;

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeOutMillis: 30000
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('connected to db');
});


pool.on('error', (error) => {
    console.log('ERROR connecting to db:', error);
});

module.exports = pool;