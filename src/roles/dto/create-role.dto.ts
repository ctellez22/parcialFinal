import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  role_name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
