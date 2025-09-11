import { Controller, Get, Post, Body, Param, Delete, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('addProduct/:id')
  async addProductToCart(@Body() createCartDto: CreateCartDto, @Req() req: Request, @Res() res: Response, @Param('id') id: mongoose.Types.ObjectId) {

    const productsInCart = await this.cartService.addProductToCart(createCartDto, req, id)

    res.status(201).json({
      productsInCart
    })

  }

  @Get('products')
  async getProductsInCart(@Req() req: Request, @Res() res: Response) {
    try {

      const allProducts = await this.cartService.getProductsInCart(req)

      res.status(200).json({
        allProducts
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Delete('removeProduct/:id')
  async removeProductFromCart(@Param('id') id: mongoose.Types.ObjectId) {

    const removedProduct = await this.cartService.removeProductFromCart(id)

    return {
      removedProduct
    }

  }
}
