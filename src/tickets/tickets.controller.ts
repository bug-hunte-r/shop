import { Controller, Get, Post, Body, Param, Req, Res } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post(':id')
  async addNewTicket(@Body() createTicketDto: CreateTicketDto, @Req() req: Request, @Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const newTicket = await this.ticketsService.addNewTicket(createTicketDto, req, id)

      res.status(201).json({
        message: newTicket
      })


    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Post('answer/:id')
  async sendAnswer(@Body() createTicketDto: CreateTicketDto, @Req() req: Request, @Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const newAnswer = await this.ticketsService.sendAnswer(createTicketDto, req, id)

      res.status(201).json({
        newAnswer
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Get('answer/:id')
  async getAnswers(@Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const answers = await this.ticketsService.getAnswers(id)

      res.status(200).json({
        answers
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Post('usersanswer/:id')
  async sendAnswerForUsers(@Body() createTicketDto: CreateTicketDto, @Req() req: Request, @Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const newUsersAnswer = await this.ticketsService.sendAnswerForUsers(createTicketDto, req, id)

      res.status(201).json({
        newUsersAnswer
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }
}
