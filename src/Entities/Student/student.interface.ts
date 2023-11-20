import { Course } from '../Course/course.interface';

export interface Student {
  id: number;
  name: string;
  lastName: string;
  email: string;
  courses?: Course[];
}
