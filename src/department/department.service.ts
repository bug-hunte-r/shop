import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import Department from 'src/models/department';

@Injectable()
export class DepartmentService {

    async createDepartment(createDepartmentDto: CreateDepartmentDto) {

        if (!createDepartmentDto.subject.trim()) {
            throw new BadRequestException('Data is not valid')
        }

        const isDepartmentExist = await Department.findOne({ subject: createDepartmentDto.subject })

        if (isDepartmentExist) {
            throw new ConflictException('Department is already exist')
        }

        await Department.create({ ...createDepartmentDto })

        return 'Department Created'
    }
}
