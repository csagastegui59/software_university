import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}
  async createEnrollment(data) {
    try {
      let isEnrolled = false;
      const enrollments = await this.prisma.enrollment.findMany({
        where: {
          studentId: Number(data.studentId),
        },
      });

      enrollments.map((enrollment) => {
        if (
          enrollment.courseId === data.courseId &&
          enrollment.season === data.season &&
          enrollment.year === data.year
        ) {
          isEnrolled = true;
        }
      });

      if (isEnrolled === false) {
        return this.prisma.enrollment.create({ data });
      } else {
        throw new Error('El estudiante ya está matriculado en este curso');
      }
    } catch (error) {
      throw new Error('Error al crear la matrícula');
    }
  }

  async getEnrollmentById(id) {
    try {
      return await this.prisma.enrollment.findUnique({
        where: { id: Number(id) },
        include: {
          student: true,
          course: true,
        },
      });
    } catch (error) {
      throw new Error('Error al obtener la matrícula');
    }
  }

  async getAllEnrollments() {
    try {
      return await this.prisma.enrollment.findMany({
        include: { student: true, course: true },
      });
    } catch (error) {
      throw new Error('Error al obtener las matrículas');
    }
  }

  async updateEnrollment(id, data) {
    try {
      return await this.prisma.enrollment.update({
        where: { id: Number(id) },
        include: { student: true, course: true },
        data,
      });
    } catch (error) {
      throw new Error('Error al actualizar la matrícula');
    }
  }
}
