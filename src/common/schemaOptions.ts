import { SchemaOptions } from 'mongoose';

export const schemaOptions = (): SchemaOptions => ({
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret._id;
    },
  },
});
