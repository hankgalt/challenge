'use strict';
const mockDBCalls = require('../database/index.js');

const getUsersHandler = async (request, response) => {
    try {
        const data = await mockDBCalls.getUsers();
        return response.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("getUsersHandler() - error: ", error.message);
        return response.status(500).send(JSON.stringify(error));
    }
};

module.exports = (app) => {
    app.get('/users', getUsersHandler);
};
