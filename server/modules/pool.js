const pg = require('pg')
const Pool = pg.Pool;
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {

    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: { rejectUnauthorized: false },
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
      };
} else {
    config = {
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeOutMillis: 30000
    };
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('connected to db');
});


pool.on('error', (error) => {
    console.log('ERROR connecting to db:', error);
});

module.exports = pool;