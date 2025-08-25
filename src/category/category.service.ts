import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
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
}
