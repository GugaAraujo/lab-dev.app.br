import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { AdminOnly } from 'src/auth/decorators/admin-only.decorator';
import { MongoIdValidation } from 'src/auth/decorators/is-mongo-id.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { QueryCompanyDto } from './dto/query-company.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateDomainsDto } from './dto/update-domains.dto';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  @UseInterceptors(AdminOnly)
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @UseInterceptors(AdminOnly)
  findAll(@Query() query: QueryCompanyDto): Promise<Company[]> {
    return this.companyService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(AdminOnly, MongoIdValidation)
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(AdminOnly, MongoIdValidation)
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateAddressDto,
  ): Promise<Company> {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Patch(':id/domains/')
  @UseInterceptors(AdminOnly, MongoIdValidation)
  updateDomain(
    @Param('id') id: string,
    @Body() domains: UpdateDomainsDto,
  ): Promise<Company> {
    return this.companyService.updateDomain(id, domains);
  }

  @Delete(':id')
  @UseInterceptors(AdminOnly, MongoIdValidation)
  removeCompany(@Param('id') id: string): Promise<object> {
    return this.companyService.removeCompany(id);
  }
}
