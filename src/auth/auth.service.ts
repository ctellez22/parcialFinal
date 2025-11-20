import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const usuarioExistente = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const nuevoUsuario = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
      phone: registerDto.phone,
    });

    if (registerDto.roleIds && registerDto.roleIds.length > 0) {
      const rolesEncontrados = await this.roleRepository.findBy({
        id: In(registerDto.roleIds),
      });

      if (rolesEncontrados.length !== registerDto.roleIds.length) {
        throw new BadRequestException('Uno o más roles no existen');
      }

      nuevoUsuario.roles = rolesEncontrados;
    }

    const usuarioGuardado = await this.userRepository.save(nuevoUsuario);

    const { password, ...datosUsuario } = usuarioGuardado;

    return {
      message: 'Usuario registrado con éxito',
      userId: datosUsuario.id,
    };
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['roles'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!usuario.is_active) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const passwordValido = await bcrypt.compare(loginDto.password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      roles: usuario.roles.map(rol => rol.role_name),
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: usuario.id,
        email: usuario.email,
        name: usuario.name,
        roles: usuario.roles.map(rol => ({
          id: rol.id,
          name: rol.role_name,
        })),
      },
    };
  }

  async validateUser(userId: string) {
    const usuario = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!usuario || !usuario.is_active) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return usuario;
  }
}
