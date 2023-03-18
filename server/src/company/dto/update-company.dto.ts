import { Company } from '../entities/company.entity';
import {
  IsArray,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateCompanyDto extends Company {
  @IsString()
  address: string;

  @IsArray()
  @IsString({ each: true })
  @IsUrl(
    {
      require_protocol: true,
      require_valid_protocol: true
    },
    {
      each: true,
      message: 'Company URL is not valid.',
    },
  )
  domains: string[];
}
