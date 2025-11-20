import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppintmentDto } from './dto/create-appintment.dto';
import { UpdateAppintmentDto } from './dto/update-appintment.dto';
import { Appintment } from './entities/appintment.entity';

@Injectable()
export class AppintmentsService {
  constructor(
    @InjectRepository(Appintment)
    private appintmentRepository: Repository<Appintment>,
  ) {}

  create(createAppintmentDto: CreateAppintmentDto) {
    const appintment = this.appintmentRepository.create(createAppintmentDto);
    return this.appintmentRepository.save(appintment);
  }



  findAll() {
    return this.appintmentRepository.find();
  }
  findOne(id: string) {
    return this.appintmentRepository.findOne({ where: { id } });
  }

  update(id: string, updateAppintmentDto: UpdateAppintmentDto) {
    return this.appintmentRepository.update(id, updateAppintmentDto);
  }

  remove(id: string) {
    return this.appintmentRepository.delete(id);
  }
}
