import { PartialType } from '@nestjs/mapped-types';
import { CreateAppintmentDto } from './create-appintment.dto';

export class UpdateAppintmentDto extends PartialType(CreateAppintmentDto) {}
