const { queue } = require('async');
const { Client } = require('pg');

var databaseConfig = {
  user: 'kzaeqgqu',
  host: 'john.db.elephantsql.com',
  database: 'kzaeqgqu',
  password: 'uNmijAbFWG6Y6slp7tl51tp02SYAvEcr',
  port: 5432,
};

function getWord() {
  const client = new Client(databaseConfig);
  client.connect();

  const sql = 'SELECT * FROM word_table ORDER BY RANDOM() LIMIT 1;';

  return client.query(sql)
  .then(function(result){
    client.end();
    return result.rows[0];
  })
  .catch(function(error){
    client.end();
    throw error;
  });
}

function closeDatabaseConnections() {
    /**
     * return a promise that resolves when all connection to the database is successfully closed, and rejects if there was any error.
     */
}

module.exports = {
    getWord,
    closeDatabaseConnections,
};
