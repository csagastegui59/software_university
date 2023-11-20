import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async createStudent(data) {
    try {
      return await this.prisma.student.create({ data });
    } catch (error) {
      throw new Error('Error al crear el estudiante');
    }
  }

  async getStudentById(id) {
    try {
      return await this.prisma.student.findUnique({
        where: { id: Number(id) },
        include: {
          enrollments: true,
        },
      });
    } catch (error) {
      throw new Error('Error al obtener el estudiante');
    }
  }

  async getAllStudents() {
    try {
      return await this.prisma.student.findMany({
        include: { enrollments: true },
      });
    } catch (error) {
      throw new Error('Error al obtener los estudiantes');
    }
  }

  async updateStudent(id, data) {
    try {
      return await this.prisma.student.update({
        where: { id: Number(id) },
        include: { enrollments: true },
        data,
      });
    } catch (error) {
      throw new Error('Error al actualizar el estudiante');
    }
  }
}
