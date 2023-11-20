import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async createTeacher(data) {
    try {
      return await this.prisma.teacher.create({ data });
    } catch (error) {
      throw new Error('Error al crear el profesor');
    }
  }

  async getTeacherById(id) {
    try {
      return this.prisma.teacher.findUnique({
        where: { id: Number(id) },
        include: { courses: true },
      });
    } catch (error) {
      throw new Error('Error al obtener el profesor');
    }
  }

  async getAllTeachers() {
    try {
      return await this.prisma.teacher.findMany({
        include: { courses: true },
      });
    } catch (error) {
      throw new Error('Error al obtener los profesores');
    }
  }

  async updateTeacher(id, data) {
    try {
      return await this.prisma.teacher.update({
        where: { id: Number(id) },
        include: { courses: true },
        data,
      });
    } catch (error) {
      throw new Error('Error al actualizar el profesor');
    }
  }
}
