'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getUserItems = (users) => {
    const dataAccessMethod = () => users.split(',').reduce((res, user) => {
        const items = db.itemsOfUserByUsername[user];
        _.forEach(items, item => {
            if (!res.includes(item)) {
                res.push(item);
            }
        });
        return res;
    }, []);
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // fill me in :)
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getUserItems,
    getListOfAgesOfUsersWith
};
