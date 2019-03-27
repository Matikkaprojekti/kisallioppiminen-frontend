export interface Scoreboard {
  students: Student[]
}

export interface Student {
  lastname: string
  firstname: string
  exercises: Exercise[]
}

export interface UserCourse {
  name: string
  coursekey: string
  owner_id: number
  version: string
  coursematerial_name: string
  startdate: string
  enddate: string
  students: Student[]
  exerciseNumbers: string[]
}

export interface IdyllCourses {
  name: string
  coursekey: string
  id: string
  version: string
  startdate: string
  enddate: string
  students: Student[]
  exerciseNumbers: string[]
}

export interface Exercise {
  uuid: string
  status: string
}
