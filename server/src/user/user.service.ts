import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './entities/Role.enum';
import { BasicUserDto } from './dto/basic-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email }
    });
    if (userExists) {
      throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
    }

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      hash: await bcrypt.hash(createUserDto.hash, 10),
    };

    const createdUser = await this.prisma.user.create({ data });
    delete createdUser.hash;

    return createdUser;
  }

  async findAll(): Promise<BasicUserDto[]>  {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async findOne(id: string): Promise<BasicUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      }
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async remove(id: string): Promise<object> {
    const user = await this.findOne(id)

    if (user) {
      await this.prisma.user.delete({
        where: { id: user.id },
      })
      return { message: "User deleted" };
    }
  }

  async isAdmin(id: string): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        role: true,
      }
    });

    return { admin: user.role === Role.ADMIN};
  }
}
