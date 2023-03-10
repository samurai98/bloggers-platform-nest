import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ErrorMessage } from '../filters';

import { PaginationQueryDTO } from '../pagination';

@Injectable()
export class QueryValidationPipe implements PipeTransform {
  constructor(private EntityQueryDTO: typeof PaginationQueryDTO) {}

  async transform(value: any, { type, metatype }: ArgumentMetadata) {
    if (type !== 'query' || !metatype) return value;

    const object = plainToInstance(this.EntityQueryDTO, value);
    const errors = await validate(object);

    if (errors.length > 0)
      throw new BadRequestException({
        message: errors.map<ErrorMessage>(({ property }) => ({ message: `${property} query error`, field: property })),
      });

    return object;
  }
}
