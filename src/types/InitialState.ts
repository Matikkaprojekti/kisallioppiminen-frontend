import { UserCourse } from './jsontypes'

export interface InitialState {
  courses: Course[]
  pageParams: PageParams
  error: {
    message: string
    visible: boolean
  }
}

export interface User {
  id: number
  name: string
}

export interface PageParams {
  path?: string
  pathParams: any // No smart way of typifying these, so let's just got with any
  user: User | null
}

export interface Course {
  id: string
  courseName: string
  quickLinks: string[]
  courseContent: Array<{ version: string; content: string; quickLinks: string[] }>
}

export interface CoursePageState {
  selectedCourseVersion: string | null
}

export interface ExercisesState {
  idToNumber: { [s: string]: string }
  courseExercises: { [s: string]: string[] }
}

export interface AdminPageState {
  ownCourses: UserCourse[]
  teacherCourses: UserCourse[]
  newInstanceForm: {
    name: string
    coursematerial_name: string
    version: string
    coursekey: string
    startdate: string
    enddate: string
  }
}
