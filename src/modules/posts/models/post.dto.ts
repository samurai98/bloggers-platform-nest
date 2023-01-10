import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

import { PaginationQueryDTO } from '../../../common/pagination';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(100)
  readonly shortDescription: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  readonly content: string;

  @IsString()
  @IsUUID()
  readonly blogId: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class CreatePostDtoByBlogId extends OmitType(CreatePostDto, ['blogId']) {}

export class PostQueryDTO extends PaginationQueryDTO {
  @IsOptional()
  @IsUUID()
  readonly blogId: string | undefined;
}
