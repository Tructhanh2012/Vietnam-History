const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'sa',
    password: '12345',
    database: 'quiz_db',
});

// Export a function to execute database queries
module.exports = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
