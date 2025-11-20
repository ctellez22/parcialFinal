import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppintmentsService } from './appintments.service';
import { CreateAppintmentDto } from './dto/create-appintment.dto';
import { UpdateAppintmentDto } from './dto/update-appintment.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('appintments')
export class AppintmentsController {
  constructor(private readonly appintmentsService: AppintmentsService) {}

  @Post()
  @Roles('admin', 'user')
  create(@Body() createAppintmentDto: CreateAppintmentDto) {
    return this.appintmentsService.create(createAppintmentDto);
  }

  @Get()
  @Roles('admin', 'user','doctor')
  /* NO SUPE COMO DIFERENCIAR QUE CADA UNO ACCEDA A SUS PROPIAS COSAS
  POR ESO PUESE ACCESO A TODOS */
  findAll() {
    return this.appintmentsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user','doctor')
  findOne(@Param('id') id: string) {
    return this.appintmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin','doctor')
  update(@Param('id') id: string, @Body() updateAppintmentDto: UpdateAppintmentDto) {
    return this.appintmentsService.update(id, updateAppintmentDto);
  }

  @Delete(':id')
  @Roles('admin', 'user','doctor')
  remove(@Param('id') id: string) {
    return this.appintmentsService.remove(id);
  }
}
