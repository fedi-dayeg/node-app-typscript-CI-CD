'use strict';
import {
    Model
} from 'sequelize';

interface ProjectAssignments {
    id: number;
    title: string;
    status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Project extends Model<ProjectAssignments> implements ProjectAssignments {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        status!: string;
        title!: string;

        static associate(models: any) {
            // define association here
            Project.belongsToMany(models.User, {
                through: 'ProjectAssignments'
            });
        }


    }

    Project.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};
