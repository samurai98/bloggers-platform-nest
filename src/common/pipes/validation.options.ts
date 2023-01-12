import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { ErrorMessage } from '../filters';

const getErrorMessage = (error: ValidationError): string => {
  if (!error.constraints || Object.values(error.constraints).length === 0) return '';

  return Object.values(error.constraints)[0];
};

const exceptionFactory = (errors: ValidationError[]) => {
  const errorsMessage = errors.map<ErrorMessage>((error) => ({
    message: getErrorMessage(error),
    field: error.property,
  }));

  throw new BadRequestException(errorsMessage);
};

export const validationOptions: ValidationPipeOptions = {
  whitelist: true,
  exceptionFactory,
};
