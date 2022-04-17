import userModel from '../userModel.js';

export function checkIsUserExistQuery(email) {
  return userModel.findOne({ where : { email: email }})
    .then((doc) => !!doc)
    .catch(() => false);
}
