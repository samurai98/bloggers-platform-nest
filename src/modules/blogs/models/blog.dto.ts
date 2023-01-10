import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

import { PaginationQueryDTO } from '../../../common/pagination';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  @MaxLength(500)
  readonly websiteUrl: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly description: string;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

export class BlogQueryDTO extends PaginationQueryDTO {
  @IsOptional()
  @IsString()
  readonly searchNameTerm: string = '';
}
