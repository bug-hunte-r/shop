import { BadRequestException, Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { AddCategoryDto } from './add-category-dto/add-category-dto';
import Category from 'models/category';
@Injectable()
export class CategoryService {

    async addCategory(addCategoryDto: AddCategoryDto) {

        if (!addCategoryDto.title.trim()) {
            throw new BadRequestException('Data is not valid')
        }

        const isCategoryExist = await Category.findOne({ title: addCategoryDto.title })

        if (isCategoryExist) {
            throw new ConflictException('This category is already exist')
        }

        await Category.create({ ...addCategoryDto })

        return 'Category add successfully'
    }

    async getAllCategories() {

        const allCategories = await Category.find({})

        if (allCategories.length === 0) {
            throw new NotFoundException('Dont have any category yet')
        }

        return allCategories
    }
}
