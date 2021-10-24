"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
const port = 3100 ? parseInt('3100', 10) : 3000;
const server = new index_1.default(app);
app.listen(port, 'localhost', () => {
    // tslint:disable-next-line:no-console
    console.info(`Server running on : http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        // tslint:disable-next-line:no-console
        console.log('server startup error: address already in use');
    }
    else {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
});
// import db from './src/models';
/* import { users } from "./src/seeders/users";
import { projects } from "./src/seeders/projects";
import { projectAssignements } from "./src/seeders/projectAssignements"; */
/* const createUseres = () => {
    users.map(user => {
        db.User.create(user)
    })
}; */
// createUseres();
/* const createProject = () => {
    projects.map(project => {
        db.Project.create(project);
    })
};

createProject(); */
/* const createProjectAssignements = () => {
    projectAssignements.map(projectAssignement => {
        db.projectAssignements.create(projectAssignement);
    })
};

createProjectAssignements(); */
/* app.get('/user', (req, res) => {
    db.User.findAll({
        include: {
            model: db.Project
        }
    }).then((result: object) => res.json(result)).catch((err: object) => {
        // console.log(err);
    });
}); */
/* db.sequelize.sync().then(() => {
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`App Listening on port ${port}`);
    });
}); */
