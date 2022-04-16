import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import { checkPassword } from '../helpers/checkPassword.js';
import userCreateQuery from '../queries/userCreateQuery.js';
import { checkIsUserExistQuery } from '../queries/checkIsUserExistQuery.js';
import pkg from 'lodash';
const { get } = pkg;

const userRegister = async (req, res) => {

  const user = {
    firstName: get(req, 'body.firstName'),
    lastName: get(req, 'body.lastName'),
    email: get(req, 'body.email').trim().toLowerCase(),
    password: get(req, 'body.password'),
  };

  if (!checkPassword(user.password)) {
    const reason = 'Wrong password format';

    analytics('USER_REGISTER_FAIL', {
      reason: reason,
      userData: { ...user, password: null },
      controller: 'userControllerRegister',
    });

    return res.status(400).json(message.fail(reason));
  }

  if (user.email.includes(' ')) {
    return res.status(400).json(message.fail('Incorrect email format'));
  }

  const isUserExists = await checkIsUserExistQuery(user.email);

  if (isUserExists) {
    //
    analytics('USER_REGISTER_FAIL', {
      reason: 'Mail exists',
      userData: { ...user, password: null },
      controller: 'userControllerRegister',
    });

    return res.status(409).json(message.fail('User with this e-mail exists'));
  }

  const createdUser = await userCreateQuery(user);

  if (createdUser.success) {
    analytics('USER_REGISTER_SUCCESS', {
      userData: {
        ...user,
        password: null,
      },
    });

    return res.status(201).json(message.success('User created successfully.',  { userId: createdUser.payload.id }));
  } else {
    //
    analytics('USER_REGISTER_FAIL', {
      reason: get(createdUser, 'payload.messages'),
      userData: { ...user, password: null },
    });

    return res.status(404).json(message.fail('User was not created'));
  }
};

export default userRegister;
