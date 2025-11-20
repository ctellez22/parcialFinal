import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const usuarioExistente = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordEncriptado = await bcrypt.hash(createUserDto.password, 10);

    const usuario = this.userRepository.create({
      ...createUserDto,
      password: passwordEncriptado,
    });

    return await this.userRepository.save(usuario);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'email', 'name', 'phone', 'is_active', 'created_at'],
    });
  }

  async findOne(id: string): Promise<User> {
    const usuario = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'phone', 'is_active', 'created_at'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const usuario = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== usuario.email) {
      const emailDuplicado = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (emailDuplicado) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findOne(id);
    await this.userRepository.remove(usuario);
  }
}
