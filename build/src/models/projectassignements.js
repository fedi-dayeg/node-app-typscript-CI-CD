'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProjectAssignements extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ProjectAssignements.init({
        ProjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Projects',
                key: 'id'
            }
        },
        UserId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'projectAssignements',
    });
    return ProjectAssignements;
};
