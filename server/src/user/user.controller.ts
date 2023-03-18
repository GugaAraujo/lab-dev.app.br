import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BasicUserDto } from './dto/basic-user.dto';
import { User } from './entities/user.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

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
  findOne(@Param('id') id: string): Promise<BasicUserDto> {
    return this.userService.findOne(id);
  }

  @Get(':id/admin')
  isAdmin(@Param('id') id: string): Promise<object> {
    return this.userService.isAdmin(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Object> {
    return this.userService.remove(id);
  }
}
