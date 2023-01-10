import { Prop, raw, Schema } from '@nestjs/mongoose';

import { schemaOptions } from '../../../common/schemaOptions';
import { reaction } from '../../../common/types/reactions';

@Schema(schemaOptions())
export class Post {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  // @Prop({ required: true })
  // userId: string;

  @Prop({ required: true })
  blogId: string;

  @Prop({ required: true })
  blogName: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop(raw([reaction]))
  reactions: Record<string, string>[];
}
