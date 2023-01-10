import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsEmail, Length } from 'class-validator';

import { PaginationQueryDTO } from '../../../common/pagination';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserQueryDTO extends PaginationQueryDTO {
  @IsOptional()
  @IsString()
  readonly searchLoginTerm: string = '';

  @IsOptional()
  @IsString()
  readonly searchEmailTerm: string = '';
}
