import userModel from '../userModel.js';
import message from '../../utils/messages.js';
import hashPassword from "../helpers/hashPassword.js";

const userCreateQuery = async (user) => {

  const newUser = {
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    password: hashPassword(user.password),
  };

  return await userModel
    .create(newUser)
    .then((user) => {
      return message.success('User created successfully', user, true);
    })
    .catch((error) => {
      return message.fail('Error', error);
    });
};

export default userCreateQuery;
