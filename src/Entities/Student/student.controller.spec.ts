import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaService } from '../../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';
import { CacheInterceptor, CacheModule, CACHE_MANAGER } from '@nestjs/common';

describe('StudentController', () => {
  let studentController: StudentController;
  let prismaService: PrismaService;
  let interceptor: CacheInterceptor;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheInterceptor,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        StudentService,
        StudentController,
        PrismaService,
      ],
      imports: [PrismaService, CacheModule.register()],
    }).compile();
    studentController = module.get<StudentController>(StudentController);
    prismaService = module.get<PrismaService>(PrismaService);
    interceptor = module.get<CacheInterceptor>(CacheInterceptor);
    nock('https://jsonplaceholder.typicode.com').post('/users').reply(200, {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    });
  });

  it('should validate a student with external service', async () => {
    const studentData = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    };

    const createdStudent = await studentController.createStudent(studentData);

    expect(createdStudent).toBeDefined();
    expect(createdStudent.lastName).toEqual('Doe');
    expect(createdStudent.name).toEqual('John');
    expect(createdStudent.email).toEqual('johndoe@example.com');
  });

  describe('createOne', () => {
    it('should create a student', async () => {
      const student = {
        name: 'John',
        lastName: 'Doe',
        email: 'JohnDoe@testmail.com',
      };

      const createdStudent = await studentController.createStudent(student);

      expect(createdStudent).toBeDefined();
      expect(createdStudent.name).toEqual('John');
      expect(createdStudent.lastName).toEqual('Doe');
      expect(createdStudent.email).toEqual('JohnDoe@testmail.com');
    });
  });

  describe('getOne', () => {
    it('should get a student with given id', async () => {
      const teacher = await studentController.getStudentById('1');

      expect(teacher).toBeDefined();
      expect(teacher.name).toEqual('John');
      expect(teacher.lastName).toEqual('Doe');
      expect(teacher.email).toEqual('johndoe@example.com');
    });
  });

  describe('getAll', () => {
    it('should get all students', async () => {
      const students = await studentController.getAllStudents();

      expect(students).toBeDefined();
      expect(students.length).toEqual(2);
      expect(students[0].name).toEqual('John');
      expect(students[0].lastName).toEqual('Doe');
      expect(students[0].email).toEqual('johndoe@example.com');
    });
  });

  describe('updateOne', () => {
    it('should update a student with given id', async () => {
      const newValues = {
        name: 'Robert',
        lastName: 'Fernandez',
        email: 'newMail@testmail.com',
      };

      const updatedStudent = await studentController.updateStudent(
        '1',
        newValues,
      );

      expect(updatedStudent).toBeDefined();
      expect(updatedStudent.name).toEqual('Robert');
      expect(updatedStudent.lastName).toEqual('Fernandez');
      expect(updatedStudent.email).toEqual('newMail@testmail.com');
    });
  });

  afterAll(async () => {
    await prismaService.clearStudentsTable();
    await prismaService.$disconnect();
  });
});
