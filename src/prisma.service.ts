import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async clearTeachersTable(): Promise<number> {
    try {
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
      await this.$executeRaw`TRUNCATE teachers;`;
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;

      return 1;
    } catch (error) {
      console.error('Error al limpiar la tabla:', error);
      throw error;
    }
  }

  async clearStudentsTable(): Promise<number> {
    try {
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
      await this.$executeRaw`TRUNCATE students;`;
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;

      return 1;
    } catch (error) {
      console.error('Error al limpiar la tabla:', error);
      throw error;
    }
  }

  async clearCoursesTable(): Promise<number> {
    try {
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
      await this.$executeRaw`TRUNCATE courses;`;
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;

      return 1;
    } catch (error) {
      console.error('Error al limpiar la tabla:', error);
      throw error;
    }
  }

  async clearDatabase(): Promise<number> {
    try {
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
      await this.$executeRaw`TRUNCATE courses;`;
      await this.$executeRaw`TRUNCATE students;`;
      await this.$executeRaw`TRUNCATE enrollments;`;
      await this.$executeRaw`TRUNCATE teachers;`;
      await this.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;

      return 1;
    } catch (error) {
      console.error('Error al limpiar la tabla:', error);
      throw error;
    }
  }
}
