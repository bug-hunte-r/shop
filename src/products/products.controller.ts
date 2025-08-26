import { Controller, Get, Post, Body, Res, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import type { Response } from 'express';
import mongoose from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async AddProduct(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    try {

      const newProduct = await this.productsService.AddProduct(createProductDto)

      res.status(201).json({
        newProduct
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Delete(':id')
  async DeleteProduct(@Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const deletedProduct = await this.productsService.DeleteProduct(id)

      res.status(200).json({
        deletedProduct
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }

  }

  @Get()
  async getAllProducts(@Res() res: Response) {
    try {

      const products = await this.productsService.getAllProducts()

      res.status(200).json({
        products
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }
    
  }
}
