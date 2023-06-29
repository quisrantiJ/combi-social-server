import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../user/models/user.schema';
import { Post } from '../../post/models/post.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  text: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  author: User;

  @Prop({ type: Types.ObjectId, ref: Post.name })
  post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
