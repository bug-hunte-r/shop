import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import mongoose from 'mongoose';
import Cart from 'src/models/cart';

@Injectable()
export class CartService {
    constructor(private readonly usersService: UsersService) { }

    async addProductToCart(createCartDto: CreateCartDto, req: Request, id: mongoose.Types.ObjectId) {
        try {

            const mainUser = await this.usersService.getOneUser(req)
            const userId = mainUser._id

            await Cart.create({ ...createCartDto, user: userId, product: id })

            return 'Product added to cart'

        } catch (error) {
            if (error.code === 11000) {

                await Cart.findOneAndUpdate({ product: id }, {
                    $inc: { count: + 1 }
                })

                return 'Product count is update'
                
            }
        }

    }
}
