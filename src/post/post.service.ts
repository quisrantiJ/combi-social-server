import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './models/post.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    private userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    const user = await this.userService.findOne(createPostDto.author);

    if (!user) {
      throw new BadRequestException();
    }

    const post = new this.postModel(createPostDto);

    return post.save();
  }

  findAll(): Promise<PostDocument[]> {
    return this.postModel.find().populate({ path: 'author' }).exec();
  }

  async findOne(id: string): Promise<PostDocument> {
    return this.postModel.findById(id).populate({ path: 'author' });
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDocument> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto);
  }

  async remove(id: string): Promise<PostDocument> {
    return this.postModel.findByIdAndRemove(id);
  }
}
