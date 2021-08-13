'use strict';
const mockDBCalls = require('../database/index.js');

const getUserItemsHandler = async (request, response) => {
    const users = request.query.users;
    const data = await mockDBCalls.getUserItems(users);
    return response.status(200).send(JSON.stringify(data));
};

module.exports = (app) => {
    app.get('/userItems', getUserItemsHandler);
};