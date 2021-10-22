'use strict';
import { Model } from 'sequelize';

interface ProjectassignementsAttributes {
  ProjectId: number;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectAssignements extends Model<ProjectassignementsAttributes> implements ProjectassignementsAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }

    ProjectId!: number;
    UserId!: string;
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
