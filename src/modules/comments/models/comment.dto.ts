import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

import { PaginationQueryDTO } from '../../../common/pagination';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(20, 300)
  readonly content: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

export class CommentQueryDTO extends PaginationQueryDTO {
  @IsOptional()
  @IsUUID()
  readonly postId: string | undefined;
}
