import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import Product from 'models/product';
import mongoose from 'mongoose';

@Injectable()
export class ProductsService {

  async AddProduct(createProductDto: CreateProductDto) {

    const isProductExist = await Product.findOne({ title: createProductDto.title })

    if (isProductExist) {
      throw new ConflictException('Product already exist')
    }

    const newProduct = await Product.create({ ...createProductDto })

    return {
      message: 'Product added successfully',
      data: newProduct.category
    }

  }

  async DeleteProduct(id: mongoose.Types.ObjectId) {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      throw new NotFoundException('Product not found')
    }

    return 'Product deleted successfully'
  }

  async getAllProducts() {
    const products = await Product.find({}).populate('category').populate('comments')

    if (products.length === 0) {
      throw new NotFoundException('Products not found')
    }

    return products
  }

}
