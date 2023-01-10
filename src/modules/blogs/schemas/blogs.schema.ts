import { Prop, Schema } from '@nestjs/mongoose';

import { schemaOptions } from '../../../common/schemaOptions';

@Schema(schemaOptions())
export class Blog {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  websiteUrl: string;

  //   @Prop({ required: true })
  //   userId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createdAt: string;
}
