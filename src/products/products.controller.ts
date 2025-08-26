import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import type { Response } from 'express';

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
}
