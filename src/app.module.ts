import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UsersModule, CategoryModule, ProductsModule, CommentsModule, AddressModule, OrderModule],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
