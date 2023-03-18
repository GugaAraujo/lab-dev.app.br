import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class BasicUserDto extends PickType(CreateUserDto, ['id', 'name', 'email']) { }
