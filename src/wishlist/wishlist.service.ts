import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import Wishlist from 'src/models/wishlist';
import { Request } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(private readonly usersSerive: UsersService) { }

  async addWishlist(req: Request, id: mongoose.Types.ObjectId) {

    try {
      const mainUser = await this.usersSerive.getOneUser(req)
      const userId = mainUser._id

      await Wishlist.create({ user: userId, product: id })

      return 'Product added to wishlist'

    } catch (error) {

      if (error.code === 11000) {
        throw new ConflictException('This wish is already exist in your wishlist')
      }

    }
  }

  async getWishes(req: Request) {

    const mainUser = await this.usersSerive.getOneUser(req)
    const userId = mainUser._id

    const usersWishes = await Wishlist.find({ user: userId }).populate('user').populate('product')

    if (usersWishes.length === 0) {
      throw new NotFoundException('This user not have any wishes')
    }

    return usersWishes

  }

}
