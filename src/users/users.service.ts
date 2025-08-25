import { Injectable, BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './signup-dto/signup-dto';
import User from 'models/user';
import { hasePassHandler, verifyPassHandler, verifyTokenHandler } from 'configs/auth';
import { LoginDto } from './login-dto/login-dto';
import { Request } from 'express';

@Injectable()
export class UsersService {

    async SignupUser(signupDto: SignupDto) {

        if (!signupDto.username.trim() || !signupDto.mobile || !signupDto.password.trim()) {
            throw new BadRequestException('Datas are not valid')
        }

        const isUsernameExist = await User.findOne({ username: signupDto.username })

        if (isUsernameExist) {
            throw new ConflictException('Username is already exist')
        }

        const isMobileExist = await User.findOne({ mobile: signupDto.mobile })

        if (isMobileExist) {
            throw new ConflictException('Mobile is already exist')
        }

        const hashedPass = await hasePassHandler(signupDto.password)

        const users = await User.countDocuments()

        await User.create({ ...signupDto, password: hashedPass, role: users > 0 ? 'USER' : 'ADMIN' })

        return 'User signuped successfully'
    }

    async LoginUser(loginDto: LoginDto) {

        if (!loginDto.username.trim() || !loginDto.password.trim()) {
            throw new BadRequestException('Datas are not valid')
        }

        const isUserLogin = await User.findOne({ username: loginDto.username })

        if (!isUserLogin) {
            throw new NotFoundException('Account not found')
        }

        const verifiedPass = await verifyPassHandler(loginDto.password, isUserLogin.password)

        if (!verifiedPass) {
            throw new NotFoundException('Username or password is not correct')
        }

        return 'User Logged in successfully'
    }

    async getOneUser(req: Request) {
        try {

            const token = req.cookies?.['token']

            if (!token) {
                throw new UnauthorizedException('Token not found')
            }

            const verifiedToken = await verifyTokenHandler(token)

            if (!verifiedToken) {
                throw new UnauthorizedException('Token not valid')
            }

            const mainUser = await User.findOne({ username: verifiedToken.username })

            return mainUser

        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token')
        }

    }

}
