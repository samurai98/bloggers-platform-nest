import { HttpStatus, ParseUUIDPipe } from '@nestjs/common';

export const getParseUUIDPipe = () =>
  new ParseUUIDPipe({
    version: '4',
    errorHttpStatusCode: HttpStatus.NOT_FOUND,
  });
