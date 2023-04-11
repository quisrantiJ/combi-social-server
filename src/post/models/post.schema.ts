import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../user/models/user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  text: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
