import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UsersService } from 'src/users/users.service';
import Address from 'models/address';
import { Request } from 'express';

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
}
