import { Controller, Get, Post, Body, Param, Delete, Req, Res } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import type { Request, Response } from 'express';

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
}
