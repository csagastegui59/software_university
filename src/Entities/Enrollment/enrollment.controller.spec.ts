import { EnrollmentController } from './enrollment.controller';
import { CourseService } from '../Course/course.service';
import { TeacherService } from '../Teacher/teacher.service';
import { PrismaService } from '../../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from '../Student/student.service';
import { TeacherController } from '../Teacher/teacher.controller';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

describe('enrollmentController', () => {
  let enrollmentController: EnrollmentController;
  let enrollmentService: EnrollmentService;
  let prismaService: PrismaService;
  let studentService: StudentService;
  let teacherService: TeacherService;
  let courseService: CourseService;
  let interceptor: CacheInterceptor;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentController,
        StudentService,
        CourseService,
        PrismaService,
        TeacherController,
        TeacherService,
        CacheInterceptor,
        EnrollmentService,
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
    enrollmentController =
      module.get<EnrollmentController>(EnrollmentController);
    prismaService = module.get<PrismaService>(PrismaService);
    enrollmentService = module.get<EnrollmentService>(EnrollmentService);
    courseService = module.get<CourseService>(CourseService);
    studentService = module.get<StudentService>(StudentService);
    teacherService = module.get<TeacherService>(TeacherService);
    interceptor = module.get<CacheInterceptor>(CacheInterceptor);
  });

  describe('createOne', () => {
    it('should create an enrollment', async () => {
      const teacherData = {
        name: 'John',
        lastName: 'Doe',
        email: 'JohnDoetest2@testmail.com',
      };
      const createdTeacher = await teacherService.createTeacher(teacherData);

      const courseData = {
        name: 'Math',
        teacherId: createdTeacher.id,
      };

      const createdCourse = await courseService.createCourse(courseData);

      const studentData = {
        name: 'John',
        lastName: 'Doe',
        email: 'JohnDoemytest@testmail.com',
      };

      const createdStudent = await studentService.createStudent(studentData);

      const enrollmentData = {
        courseId: createdCourse.id,
        studentId: createdStudent.id,
        season: 1,
        year: 2021,
      };

      const createdEnrollment = await enrollmentController.createEnrollment(
        enrollmentData,
      );

      expect(createdEnrollment).toBeDefined();
      expect(createdEnrollment.season).toEqual(enrollmentData.season);
      expect(createdEnrollment.studentId).toEqual(createdStudent.id);
      expect(createdEnrollment.courseId).toEqual(createdCourse.id);
      expect(createdEnrollment.year).toEqual(enrollmentData.year);
    });
  });

  afterAll(async () => {
    await prismaService.clearDatabase();
    await prismaService.$disconnect();
  }, 300000);
});
