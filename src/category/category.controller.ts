import { Controller, Get, Post, Body, Res, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AddCategoryDto } from './add-category-dto/add-category-dto';
import type { Response } from 'express';
import mongoose from 'mongoose';

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

  @Get()
  async getAllCategories(@Res() res: Response) {
    try {

      const allCategories = await this.categoryService.getAllCategories()

      res.status(200).json({
        data: allCategories
      })

    } catch (error) {

      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })

    }
  }

  @Delete(':id')
  async removeOneCategory(@Param('id') id: mongoose.Types.ObjectId, @Res() res: Response) {
    try {

      const deletedCategory = await this.categoryService.removeOneCategory(id)

      res.status(200).json({
        message: deletedCategory
      })

    } catch (error) {
      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })
    }
  }
}
