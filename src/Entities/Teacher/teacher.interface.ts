import { Course } from '../Course/course.interface';

export interface Teacher {
  id: number;
  name: string;
  lastName: string;
  email: string;
  courses?: Course[];
}
