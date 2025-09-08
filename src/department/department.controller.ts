import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import type { Response } from 'express';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto, @Res() res: Response) {

    try {
      const newDepartment = await this.departmentService.createDepartment(createDepartmentDto)

      res.status(201).json({ newDepartment })

    } catch (error) {

      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })

    }

  }

}
