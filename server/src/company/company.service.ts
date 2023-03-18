import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const companyExists = await this.prisma.company.findUnique({
      where: { name: createCompanyDto.name },
    });
    if (companyExists) {
      throw new HttpException('Name is already in use', HttpStatus.CONFLICT);
    }

    const data: Prisma.CompanyCreateInput = createCompanyDto;
    return await this.prisma.company.create({ data });
  }

  async findAll(): Promise<Company[]> {
    return await this.prisma.company.findMany();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!company) {
      throw new HttpException("Company not found", HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    if (!company) {
      throw new HttpException("Company not found", HttpStatus.NOT_FOUND);
    }

    return await this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: string) {
    const company = await this.findOne(id)

    if (!company) {
      throw new HttpException("Company not found", HttpStatus.NOT_FOUND);
    }

    await this.prisma.company.delete({
      where: { id },
    })
    return { message: "Company deleted" };
  }
}
