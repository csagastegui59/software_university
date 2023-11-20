import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async createCourse(data) {
    try {
      return this.prisma.course.create({ data });
    } catch (error) {
      throw new Error('Error al crear el curso');
    }
  }

  async getCourseById(id) {
    try {
      return this.prisma.course.findFirst({
        where: { id: Number(id) },
        include: {
          teacher: true,
        },
      });
    } catch (error) {
      throw new Error('Error al obtener el curso');
    }
  }

  async getAllCourses() {
    try {
      return this.prisma.course.findMany({
        include: { teacher: true },
      });
    } catch (error) {
      throw new Error('Error al obtener los cursos');
    }
  }

  async updateCourse(id, data) {
    try {
      return this.prisma.course.update({
        where: { id: Number(id) },
        include: { teacher: true },
        data,
      });
    } catch (error) {
      throw new Error('Error al actualizar el curso');
    }
  }
}
