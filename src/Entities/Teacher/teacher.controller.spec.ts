import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { PrismaService } from '../../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('TeacherController', () => {
  let teacherController: TeacherController;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherService, TeacherController, PrismaService],
      imports: [PrismaService],
    }).compile();
    teacherController = module.get<TeacherController>(TeacherController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createOne', () => {
    it('should create a teacher', async () => {
      const teacher = {
        name: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@testmail.com',
      };

      const createdTeacher = await teacherController.createTeacher(teacher);

      expect(createdTeacher).toBeDefined();
      expect(createdTeacher.name).toEqual(teacher.name);
      expect(createdTeacher.lastName).toEqual(teacher.lastName);
      expect(createdTeacher.email).toEqual(teacher.email);
    });
  });

  describe('getOne', () => {
    it('should get a teacher with given id', async () => {
      const teacher = await teacherController.getTeacherById('1');

      expect(teacher).toBeDefined();
      expect(teacher.name).toEqual('John');
      expect(teacher.lastName).toEqual('Doe');
      expect(teacher.email).toEqual('JohnDoe@testmail.com');
    });
  });

  describe('getAll', () => {
    it('should get all teachers', async () => {
      const teachers = await teacherController.getAllTeachers();

      expect(teachers).toBeDefined();
      expect(teachers.length).toEqual(1);
      expect(teachers[0].name).toEqual('John');
      expect(teachers[0].lastName).toEqual('Doe');
      expect(teachers[0].email).toEqual('JohnDoe@testmail.com');
    });
  });

  describe('updateOne', () => {
    it('should update a teacher with given id', async () => {
      const newValues = {
        name: 'Robert',
        lastName: 'Fernandez',
        email: 'newMail@testmail.com',
      };

      const updatedTeacher = await teacherController.updateTeacher(
        '1',
        newValues,
      );

      expect(updatedTeacher).toBeDefined();
      expect(updatedTeacher.name).toEqual('Robert');
      expect(updatedTeacher.lastName).toEqual('Fernandez');
      expect(updatedTeacher.email).toEqual('newMail@testmail.com');
    });
  });

  afterAll(async () => {
    await prismaService.clearDatabase();
    await prismaService.$disconnect();
  }, 300000);
});
