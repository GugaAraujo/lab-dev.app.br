import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AdminOnly } from 'src/auth/decorators/admin-only.decorator';
import { MongoIdValidation } from 'src/auth/decorators/is-mongo-id.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseInterceptors(AdminOnly)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @UseInterceptors(AdminOnly)
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @UseInterceptors(AdminOnly, MongoIdValidation)
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(AdminOnly, MongoIdValidation)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @UseInterceptors(AdminOnly, MongoIdValidation)
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
