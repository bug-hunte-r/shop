import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { SignupDto } from './signup-dto/signup-dto';
import User from 'models/user';
import { hasePassHandler } from 'configs/auth';

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

        const hashedPass = await hasePassHandler(signupDto.password)

        const users = await User.countDocuments()

        await User.create({ ...signupDto, password: hashedPass, role: users === 0 ? 'USER' : 'ADMIN' })

        return 'User signuped successfully'
    }

}
