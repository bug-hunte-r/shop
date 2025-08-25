import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UsersModule, CategoryModule],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
