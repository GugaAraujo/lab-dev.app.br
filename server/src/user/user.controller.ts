import { Controller, Get, Post, Body, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BasicUserDto } from './dto/basic-user.dto';
import { User } from './entities/user.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { MongoIdValidation } from 'src/auth/decorators/is-mongo-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<BasicUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MongoIdValidation)
  findOne(@Param('id') id: string): Promise<BasicUserDto> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @UseInterceptors(MongoIdValidation)
  remove(@Param('id') id: string): Promise<Object> {
    return this.userService.remove(id);
  }
}
