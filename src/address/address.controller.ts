import { Controller, Get, Post, Body, Delete, Req, Res } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import type { Request, Response } from 'express';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  async addNewAddress(@Body() createAddressDto: CreateAddressDto, @Req() req: Request, @Res() res: Response) {
    try {

      const newAddress = await this.addressService.addNewAddress(createAddressDto, req)

      res.status(201).json({
        newAddress
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Get()
  async getAllAddreses(@Res() res: Response) {
    try {

      const allAddreses = await this.addressService.getAllAddreses()

      res.status(200).json({
        allAddreses
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }
    
  }
}
