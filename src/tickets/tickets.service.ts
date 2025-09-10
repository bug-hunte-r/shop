import { BadRequestException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import Ticket from 'src/models/ticket';
import { UsersService } from 'src/users/users.service';
import type { Request } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class TicketsService {
    constructor(private readonly usersService: UsersService) { }

    async addNewTicket(createTicketDto: CreateTicketDto, @Req() req: Request) {

        if (!createTicketDto.body.trim() || !createTicketDto.subject.trim()) {
            throw new BadRequestException('Datas are not valid')
        }

        const mainUser = await this.usersService.getOneUser(req)

        const userId = mainUser._id

        if (!userId) {
            throw new UnauthorizedException('Please login first')
        }

        await Ticket.create({ ...createTicketDto, user: userId })

        return 'Ticket added'
    }

    async getTickets() {

        const allTickets = await Ticket.find({}).populate('department')

        return allTickets
    }

    async getTicketsAnswer(id: mongoose.Types.ObjectId) {

        const allTicketsAnswer = await Ticket.find({ mainTicket: id })

        if (!allTicketsAnswer) {
            throw new NotFoundException('This ticket not have any answer yet')
        }

        return allTicketsAnswer
    }

    async setAnswer(@Req() req: Request, createTicketDto: CreateTicketDto, id: mongoose.Types.ObjectId) {

        const mainUser = await this.usersService.getOneUser(req)

        await Ticket.create({ ...createTicketDto, user: mainUser._id, isItAnswer: true, mainTicket: id })

        return {
            message: 'Answer sent'
        }
    }
}