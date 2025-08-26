import { Controller, Get, Post, Body, Req, Res, Delete, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  async addComment(@Body() createCommentDto: CreateCommentDto, @Req() req: Request, @Res() res: Response) {
    try {

      const newComment = await this.commentsService.addComment(createCommentDto, req)

      res.status(201).json({
        message: newComment
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Get()
  async getAllComments(@Res() res: Response) {
    try {

      const allComments = await this.commentsService.getAllComments()

      res.status(200).json({
        allComments
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }
  }

  @Delete(':id')
  async deleteCommentById(@Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const deletedComment = await this.commentsService.deleteCommentById(id)

      res.status(200).json({
        deletedComment
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }
  }
}
