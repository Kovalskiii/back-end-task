import { sequelizeClient } from '../core/database.js';
import { DataTypes } from 'sequelize';

const postModel = sequelizeClient.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    required: true,
  },

  isHidden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false,
    required: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    required: false,
    defaultValue: DataTypes.NOW,
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    required: false,
    defaultValue: DataTypes.NOW,
  },

},{
  tableName: 'posts',
  name: {
    singular: 'post',
    plural: 'posts',
  },
  timestamps: true,
});

export default postModel;


