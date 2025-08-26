import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import Product from 'models/product';

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
}
