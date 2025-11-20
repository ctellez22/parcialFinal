import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const rolExistente = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name },
    });

    if (rolExistente) {
      throw new ConflictException('El nombre del rol ya existe');
    }

    const nuevoRol = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(nuevoRol);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    const rol = await this.roleRepository.findOne({ where: { id } });

    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    return rol;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const rol = await this.findOne(id);

    if (updateRoleDto.role_name && updateRoleDto.role_name !== rol.role_name) {
      const nombreDuplicado = await this.roleRepository.findOne({
        where: { role_name: updateRoleDto.role_name },
      });

      if (nombreDuplicado) {
        throw new ConflictException('El nombre del rol ya existe');
      }
    }

    await this.roleRepository.update(id, updateRoleDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const rol = await this.findOne(id);
    await this.roleRepository.remove(rol);
  }
}
