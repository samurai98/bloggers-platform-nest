import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UsePipes } from '@nestjs/common';

import { getParseUUIDPipe, QueryValidationPipe } from '../../common/pipes';
import { ViewPagination } from '../../common/pagination';
import { EntityNotFoundException } from '../../common/exceptions';

import { CreateUserDto, UserQueryDTO } from './models/user.dto';
import { UsersService } from './services/users.service';
import { ViewUser } from './models/view-user';

@Controller('users')
export class UsersController {
  constructor(protected usersService: UsersService) {}

  @Get()
  @UsePipes(new QueryValidationPipe(UserQueryDTO))
  async findAll(@Query() queryFilter: UserQueryDTO): Promise<ViewPagination<ViewUser>> {
    return await this.usersService.findAll(queryFilter);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ViewUser> {
    return await this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @UsePipes(getParseUUIDPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const isDeleted = await this.usersService.delete(id);

    if (!isDeleted) throw new EntityNotFoundException(id);
  }
}
