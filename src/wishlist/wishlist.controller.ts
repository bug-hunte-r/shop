import { Controller, Get, Post, Body, Param, Delete, Req, Res } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) { }

  @Post(':id')
  async addWishlist(@Req() req: Request, @Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const newWishlist = await this.wishlistService.addWishlist(req, id)

      res.status(201).json({
        newWishlist
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Get()
  async getWishes(@Req() req: Request, @Res() res: Response) {
    try {

      const usersWishes = await this.wishlistService.getWishes(req)

      res.status(200).json({
        usersWishes
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Delete(':id')
  async removeWish(@Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const removedWish = await this.wishlistService.removeWish(id)

      res.status(200).json({
        removedWish
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }
    
  }
}
