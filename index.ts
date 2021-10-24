import * as dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import { Application } from 'express';
import Server from './src/index';
const app: Application = express();

const port: number = 3100 ? parseInt('3100', 10) : 3000;
const server: Server = new Server(app);

app.listen(port, 'localhost', () => {
    // tslint:disable-next-line:no-console
    console.info(`Server running on : http://localhost:${port}`);
}).on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
        // tslint:disable-next-line:no-console
        console.log('server startup error: address already in use');
    } else {
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
