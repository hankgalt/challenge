'use strict';
const mockDBCalls = require('../database/index.js');

const getUserItemsHandler = async (request, response) => {
    const users = request.query.users;
    try {
        const data = await mockDBCalls.getUserItems(users);
        return response.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("getUserItemsHandler() - error: ", error.message);
        return response.status(500).send(JSON.stringify(error));
    }
};

module.exports = (app) => {
    app.get('/userItems', getUserItemsHandler);
};