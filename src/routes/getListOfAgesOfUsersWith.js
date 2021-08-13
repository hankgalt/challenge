'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    const itemToLookup = request.query.item;
    try {
        const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
        return response.status(200).send(JSON.stringify(data));
    } catch (error) {
        console.error("getListOfAgesOfUsersWithHandler() - error: ", error.message);
        return response.status(500).send(JSON.stringify(error));
    }
};

module.exports = (app) => {
    app.get('/users/age', getListOfAgesOfUsersWithHandler);
};
