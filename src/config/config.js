require('dotenv').config();
module.exports = {
    "development": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@20.107.194.127/nodeApp",
        "host": "20.107.194.127",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@20.107.194.127/nodeApp",
        "host": "20.107.194.127",
        "dialect": "postgres"
    },
    "production": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@20.107.194.127/nodeApp",
        "host": "20.107.194.127",
        "dialect": "postgres"
    }
}
