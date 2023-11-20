import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaService } from '../../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from '../Teacher/teacher.service';
import { TeacherController } from '../Teacher/teacher.controller';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/common';

describe('CourseController', () => {
  let courseController: CourseController;
  let prismaService: PrismaService;
  let teacherController: TeacherController;
  let courseService: CourseService;
  let interceptor: CacheInterceptor;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        CourseController,
        PrismaService,
        TeacherController,
        TeacherService,
        CacheInterceptor,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
      imports: [PrismaService],
    }).compile();
    courseController = module.get<CourseController>(CourseController);
    prismaService = module.get<PrismaService>(PrismaService);
    courseService = module.get<CourseService>(CourseService);
    teacherController = module.get<TeacherController>(TeacherController);
    interceptor = module.get<CacheInterceptor>(CacheInterceptor);
  });

  describe('createOne', () => {
    it('should create a course', async () => {
      const teacherData = {
        name: 'John',
        lastName: 'Doe',
        email: 'JohnDoe152@testmail.com',
      };
      const createdTeacher = await teacherController.createTeacher(teacherData);

      const courseData = {
        name: 'Math',
        teacherId: createdTeacher.id,
      };

      const createdCourse = await courseController.createCourse(courseData);

      expect(createdCourse).toBeDefined();
      expect(createdCourse.name).toEqual('Math');
      expect(createdCourse.teacherId).toEqual(createdTeacher.id);
    });
  });

  describe('getOne', () => {
    it('should get a course with given id', async () => {
      const course = await courseController.getCourseById('1');

      expect(course).toBeDefined();
      expect(course.name).toEqual('Math');
      expect(course.teacherId).toEqual(1);
    });
  });

  describe('getAll', () => {
    it('should get all courses', async () => {
      const courses = await courseService.getAllCourses();

      expect(courses).toBeDefined();
      expect(courses.length).toEqual(courses.length);
    });
  });

  describe('updateOne', () => {
    it('should update a course with given id', async () => {
      const newValues = {
        name: 'History',
        teacherId: 1,
      };

      const updatedCourse = await courseController.updateCourse('1', newValues);

      expect(updatedCourse).toBeDefined();
      expect(updatedCourse.name).toEqual('History');
      expect(updatedCourse.teacherId).toEqual(1);
    });
  });

  afterAll(async () => {
    await prismaService.clearDatabase();
    await prismaService.$disconnect();
  }, 300000);
});
