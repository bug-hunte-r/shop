import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import Comment from 'models/comment';

@Injectable()
export class CommentsService {

    constructor(private readonly usersService: UsersService) { }

    async addComment(createCommentDto: CreateCommentDto, req: Request) {

        if (!createCommentDto.body.trim()) {
            throw new BadRequestException('Body is required')
        }

        const mainUser = await this.usersService.getOneUser(req)
        const userId = mainUser._id

        await Comment.create({ ...createCommentDto, user: userId })

        return 'Comment submited successfully'
    }

    async getAllComments() {

        const allComments = await Comment.find({}).populate('user').populate('product')

        if (allComments.length === 0) {
            throw new NotFoundException('Dont have any comment')
        }

        return allComments
    }
}
