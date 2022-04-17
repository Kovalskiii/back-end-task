import userModel from "../user/userModel.js";
import postModel from "../post/postModel.js";
import { DataTypes } from "sequelize";

postModel.belongsTo(userModel, { foreignKey: { type: DataTypes.UUID, name: 'authorId' }, as: 'author' });
userModel.hasMany(postModel, { foreignKey: { type: DataTypes.UUID, name: 'authorId' }, as: 'author' });

export { userModel, postModel }

