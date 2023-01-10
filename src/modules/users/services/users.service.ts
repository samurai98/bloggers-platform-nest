import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { generateId, getCurrentDateISO } from '../../../common/helpers/utils';
import { findPaginationEntities, ViewPagination } from '../../../common/pagination';

import { CreateUserDto } from '../models/user.dto';
import { userMapper } from './users-mapper';
import { User, UserDocumentModel } from '../schemas';
import { ViewUser } from '../models/view-user';
import { UserQueryDTO } from '../models/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: UserDocumentModel) {}

  async findAll(queryFilter: UserQueryDTO): Promise<ViewPagination<ViewUser>> {
    const { items, ...pagination } = await findPaginationEntities<User>(this.userModel, queryFilter);

    return { ...pagination, items: items.map((user) => userMapper(user)) };
  }

  async create({ email, login, password }: CreateUserDto): Promise<ViewUser | null> {
    const passSalt = 'passSalt'; //await bcrypt.genSalt(Number(SETTINGS.ROUNDS_SALT_COUNT));
    const passHash = password; //await generateHash(password, passSalt);
    const newUser = await this.userModel.createUser({
      userId: generateId(),
      email,
      login,
      passHash,
      passSalt,
      currentDate: getCurrentDateISO(),
      confirmationCode: generateId(),
    });

    // const isSend = await emailsService.sendConfirmEmail(newUser);

    // if (!isSend)return null;

    newUser && (await newUser.save());
    return newUser && userMapper(newUser.toObject());
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.userModel.findUser(id);

    user && (await user.delete());
    return !!user;
  }
}
