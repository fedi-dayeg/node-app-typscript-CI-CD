"use strict";
require('dotenv').config();
module.exports = {
    "development": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@20.107.194.127/nodeApp",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@20.107.194.127/nodeApp",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@20.107.194.127/nodeApp",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
