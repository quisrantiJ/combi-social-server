import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment, CommentDocument } from './models/comment.schema';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private userService: UserService,
    private postService: PostService,
  ) {}

  async create(createPostDto: CreateCommentDto): Promise<CommentDocument> {
    const user = await this.userService.findOne(createPostDto.author);
    const post = await this.postService.findOne(createPostDto.post);

    if (!user || !post) {
      throw new BadRequestException();
    }

    const comment = new this.commentModel(createPostDto);

    return comment.save();
  }

  findAll(): Promise<CommentDocument[]> {
    return this.commentModel
      .find()
      .populate({ path: 'author' })
      .populate({ path: 'post' })
      .exec();
  }

  async findOne(id: string): Promise<CommentDocument> {
    return this.commentModel
      .findById(id)
      .populate({ path: 'author' })
      .populate({ path: 'post' });
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDocument> {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto);
  }

  async remove(id: string): Promise<CommentDocument> {
    return this.commentModel.findByIdAndRemove(id);
  }
}
