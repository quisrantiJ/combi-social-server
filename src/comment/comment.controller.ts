import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDocument } from './models/comment.schema';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Post()
  create(@Body() createPostDto: CreateCommentDto): Promise<CommentDocument> {
    return this.commentsService.create(createPostDto);
  }

  @Get()
  findAll(@Query('postId') postId: string): Promise<CommentDocument[]> {
    if (!postId) {
      return this.commentsService.findAll();
    }

    return this.commentsService.findByPostId(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CommentDocument> {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdateCommentDto,
  ): Promise<CommentDocument> {
    return this.commentsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CommentDocument> {
    return this.commentsService.remove(id);
  }
}
