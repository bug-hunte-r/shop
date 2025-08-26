import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, CategoryModule, ProductsModule],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
