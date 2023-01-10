import { Transform, Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PaginationQueryDTO {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => value || 1)
  readonly pageNumber: number = 1;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => value || 10)
  readonly pageSize: number = 10;

  @IsOptional()
  @Transform(({ value }) => value || 'createdAt')
  readonly sortBy: string = 'createdAt';

  @IsOptional()
  @Transform(({ value }) => value || 'desc')
  readonly sortDirection: string = 'desc';
}
