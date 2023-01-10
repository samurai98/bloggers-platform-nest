import { Prop, raw, Schema } from '@nestjs/mongoose';

import { schemaOptions } from '../../../common/schemaOptions';
import { reaction } from '../../../common/types/reactions';

@Schema(schemaOptions())
export class Comment {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  postId: string;

  @Prop(raw([reaction]))
  reactions: Record<string, string>[];
}
