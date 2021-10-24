require('dotenv').config();
module.exports = {
    "development": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@40.127.96.107/nodeApp",
        "host": "40.127.96.107",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@40.127.96.107/nodeApp",
        "host": "20.107.194.127",
        "dialect": "postgres"
    },
    "production": {
        "username": "postgres",
        "password": "root",
        "database": "postgres://postgres:root@40.127.96.107/nodeApp",
        "host": "20.107.194.127",
        "dialect": "postgres"
    }
}
