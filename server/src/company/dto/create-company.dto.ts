import { Company } from '../entities/company.entity';
import {
  IsArray,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto extends Company{

  @IsString()
  @MinLength(4)
  @MaxLength(40)
  name: string;

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
