import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UsersService } from 'src/users/users.service';
import Address from '../models/address';
import { Request } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class AddressService {

    constructor(private readonly usersService: UsersService) { }

    async addNewAddress(createAddressDto: CreateAddressDto, req: Request) {

        if (!createAddressDto.city.trim() || !createAddressDto.neighborhood.trim() || !createAddressDto.province.trim() || !createAddressDto.street.trim()) {
            throw new BadRequestException('Datas are not valid')
        }

        const mainUser = await this.usersService.getOneUser(req)
        const userId = mainUser._id

        await Address.create({ ...createAddressDto, user: userId })

        return 'Address added successfully'
    }

    async getAllAddreses() {

        const allAddreses = await Address.find({}).populate('user')

        if (allAddreses.length === 0) {
            throw new NotFoundException('Dont have any address')
        }

        return allAddreses
    }

    async deleteAddress(id: mongoose.Types.ObjectId) {

        const deletedAddress = await Address.findByIdAndDelete(id)

        if (!deletedAddress) {
            throw new NotFoundException('Address not found')
        }

        return 'Address deleted successfully'
    }
}
