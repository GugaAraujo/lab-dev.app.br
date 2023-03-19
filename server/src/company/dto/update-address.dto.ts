import { Company } from '../entities/company.entity';
import { IsString } from 'class-validator';

export class UpdateAddressDto extends Company {
  @IsString()
  address: string;
}
