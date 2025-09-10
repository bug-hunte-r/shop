import { Controller, Get, Post, Body, Param, Delete, Req, Res } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  async addNewTicket(@Body() createTicketDto: CreateTicketDto, @Res() res: Response, @Req() req: Request) {

    try {
      const newTicket = await this.ticketsService.addNewTicket(createTicketDto, req)

      res.status(201).json({ newTicket })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Get()
  async getTickets() {
    const allTickets = await this.ticketsService.getTickets()

    return allTickets
  }

  @Get('answer/:id')
  async getTicketsAnswer(@Res() res: Response, @Param('id') id: mongoose.Types.ObjectId) {
    try {

      const allTicketsAnswer = await this.ticketsService.getTicketsAnswer(id)

      res.status(200).json({
        allTicketsAnswer
      })

    } catch (error) {

      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Post('answer/:id')
  async setAnswer(@Req() req: Request, @Body() createTicketDto: CreateTicketDto, @Param('id') id: mongoose.Types.ObjectId) {

    const ticketsAnswer = await this.ticketsService.setAnswer(req, createTicketDto, id)

    return ticketsAnswer
  }

}
