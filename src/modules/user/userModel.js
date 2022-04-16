import { listRoles } from '../permission/roles.js';
import { sequelizeClient } from '../core/database.js';
import { DataTypes } from 'sequelize';

const userModel = sequelizeClient.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: false,
    validate: {
      is: /^[A-Za-z\-']{1,20}$/i
    },
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: false,
    validate: {
      is: /^[A-Za-z\-']{1,20}$/i
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },

  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    required: false,
    defaultValue: ['blogger'],
    allowNull: false,
    validate: {
      isIn: [listRoles],
    },
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

  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
    required: false,
  }

},{
  tableName: 'users',
  name: {
    singular: 'user',
    plural: 'users',
  },
  timestamps: true,
});

export default userModel;
