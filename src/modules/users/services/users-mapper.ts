import { User } from '../schemas/users.schema';
import { ViewUser } from '../models/view-user';

export const userMapper = (userDB: User): ViewUser => {
  const { id, email, login, createdAt } = userDB.accountData;

  return { id, email, login, createdAt };
};
