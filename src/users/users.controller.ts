import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './signup-dto/signup-dto';
import type { Request, Response } from 'express';
import { generateToken } from 'configs/auth';
import { LoginDto } from './login-dto/login-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('Signup')
  async SignupUser(@Body() signupDto: SignupDto, @Req() req: Request, @Res() res: Response) {

    try {

      const newUser = await this.usersService.SignupUser(signupDto)

      const token = generateToken({ username: signupDto.username })

      res.cookie('token', token, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 48
      })

      res.status(201).json({
        message: newUser
      })

    } catch (error) {

      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })

    }
  }

  @Post('Login')
  async LoginUser(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
    try {

      const loginedUser = await this.usersService.LoginUser(loginDto)

      const token = generateToken({ username: loginDto.username })

      res.cookie('token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: true,
        maxAge: 1000 * 60 * 60 * 48
      })

      res.status(200).json({
        message: loginedUser
      })

    } catch (error) {

      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })

    }

  }

  @Get('me')
  async getOneUser(@Req() req: Request, @Res() res: Response) {
    try {

      const mainUser = await this.usersService.getOneUser(req)

      res.status(200).json({
        data: mainUser
      })

    } catch (error) {

      res.status(error.getStatus ? error.getStatus() : 500).json({
        message: error.message
      })

    }

  }

}
