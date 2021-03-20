const express = require('express'); // DO NOT DELETE
const cors = require('cors');
const morgan = require('morgan');
const app = express(); // DO NOT DELETE
const database = require('./database');
const { queue } = require('async');
const { response } = require('express');

app.use(morgan('dev'));
app.use(cors());

/**
 * =====================================================================
 * ========================== CODE STARTS HERE =========================
 * =====================================================================
 */

/**
 * ========================== SETUP APP =========================
 */
app.use(express.json());


const errors = {
    INVALID_JSON_BODY: {
        message: 'Input is invalid',
        status: 400,
        code: 'INVALID_JSON_BODY',
    },
    INVALID_QUERY_STRING: {
        message: 'Query is invalid', 
        status: 400,
        code: 'INVALID_QUERY_STRING',
    }
};

/**
 * ========================== Get Word API =========================
 */

app.get('/get_word',function (req, res, next) {
    database.getWord()
    .then(function(result){
        res.status(200).send(result);
    })   
    .catch(function(error){
        next(error);
    });
});

/**
 * Error Handler
 */

app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const error = err || {
        error: 'Unexpected Error!',
    };
    res.status(status).send(error);
});

function tearDown() {
    // DO NOT DELETE
    return database.closeDatabaseConnections();
}

/**
 *  NOTE! DO NOT RUN THE APP IN THIS FILE.
 *
 *  Create a new file (e.g. server.js) which imports app from this file and run it in server.js
 */

module.exports = { app, tearDown }; // DO NOT DELETE
