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
    const dataAccessMethod = () =>  _.reduce(db.itemsOfUserByUsername, (result, items, uname) => {
        if (items.includes(item)) {
            const userInfo = _.find(db.usersById, user => user.username === uname)
            if (result[userInfo.age]) {
                result[userInfo.age]++;
            } else {
                result[userInfo.age] = 1;
            }
        }
        return result;
    }, {});
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getUserItems,
    getListOfAgesOfUsersWith
};
