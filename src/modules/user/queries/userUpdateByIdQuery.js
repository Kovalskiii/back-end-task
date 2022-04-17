import userModel from '../userModel.js';
import message from '../../utils/messages.js';

const userUpdateByIdQuery = async ({ userId, values }) => {

  return await userModel.update(values, { where: { id: userId }})
    .then((doc) => {
      if (doc) {
        return message.success('Success. User updated');
      } else {
        return message.fail('Fail. User not found');
      }
    })
    .catch((error) => {
      return message.fail('Error. User update error', error);
    });
};

export default userUpdateByIdQuery;
