import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import Ticket from 'src/models/ticket';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class TicketsService {
  constructor(private readonly usersService: UsersService) { }

  async addNewTicket(createTicketDto: CreateTicketDto, req: Request, id: mongoose.Types.ObjectId) {

    if (!createTicketDto.subject.trim() || !createTicketDto.body.trim()) {
      throw new BadRequestException('Datas are not valid')
    }

    const mainUser = await this.usersService.getOneUser(req)

    const userId = mainUser._id

    await Ticket.create({ ...createTicketDto, user: userId, department: id, sender: 'USER' })

    return 'Ticket added successfully'

  }

  async sendAnswer(createTicketDto: CreateTicketDto, req: Request, id: mongoose.Types.ObjectId) {

    if (!createTicketDto.subject.trim() || !createTicketDto.body.trim()) {
      throw new BadRequestException('Datas are not valid')
    }

    const mainUser = await this.usersService.getOneUser(req)
    const userId = mainUser._id

    await Ticket.create({ ...createTicketDto, user: userId, sender: 'ADMIN', isItAnswer: true, mainTicket: id })

    await Ticket.findByIdAndUpdate(id, { $set: { hasAnswer: true } })

    return 'Answer sent'
  }

  async getAnswers(id: mongoose.Types.ObjectId) {

    const tickets = await Ticket.findOne({ _id: id })
    const answers = await Ticket.find({ mainTicket: tickets._id })

    if (answers.length === 0) {
      throw new NotFoundException('This ticket not have any answer yet')
    }

    return answers
  }

  async sendAnswerForUsers(createTicketDto: CreateTicketDto, req: Request, id: mongoose.Types.ObjectId) {

    if (!createTicketDto.subject.trim() || !createTicketDto.body.trim()) {
      throw new BadRequestException('Datas are not valid')
    }

    const mainUser = await this.usersService.getOneUser(req)
    const userId = mainUser._id

    await Ticket.create({ ...createTicketDto, user: userId, sender: 'USER', isItAnswer: true, mainTicket: id })

    await Ticket.findByIdAndUpdate(id, { $set: { hasAnswer: true } })

    return 'Answer sent'
  }

}
