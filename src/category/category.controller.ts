import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDto } from './add-category-dto/add-category-dto';
import type { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async addCategory(@Body() addCategoryDto: AddCategoryDto, @Res() res: Response) {
    try {

      res.status(201).json({
        message: await this.categoryService.addCategory(addCategoryDto)
      })

    } catch (error) {

      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })

    }
    
  }
}
