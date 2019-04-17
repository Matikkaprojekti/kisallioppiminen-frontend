import React from 'react'
import { InitialState, CoursePageState, User, Course, AdminPageState, ExercisesState } from '../../../types/InitialState'
import { connect } from 'react-redux'
import { mapChildren } from 'idyll-component-children'
import { pageStateReducer } from '../../../reducers/pageStateReducer'
import { UserCourse, Exercise } from '../../../types/jsontypes'
import { exerciseReducer } from '../../../reducers/courseReducer'

const CourseSection = (props: {
  sectionId: number
  courseTabId: number
  children: any
  numeral: number
  user: User | null
  ownCourses: UserCourse[]
  courseId: string
  courseVersion: string
  allCourses: Course[]
  exercises: ExercisesState
}) => {
  const exCount = { number: 0 }
  const { ownCourses, user, courseId, courseVersion, allCourses, exercises } = props
  const courseName = allCourses.filter(c => c.id === courseId)[0].courseName
  const course = ownCourses.filter(c => c.coursematerial_name === courseName && c.version === courseVersion)
  const showTrafficLight = () => {
    if (course.length === 0 || !user) {
      return null
    } else {
      return course[0].coursekey
    }
  }

  const betterCourse = () => {
    if (course[0] && exercises.courseExercises[`${courseId} ${course[0].version}`] !== undefined) {
      const exerciseNumbers = exercises.courseExercises[`${courseId} ${course[0].version}`].map(e => exercises.idToNumber[e])

      const students = course[0].students.map(s => ({ ...s, exercises: s.exercises.map(ex => ({ ...ex, exerciseNumber: exercises.idToNumber[ex.uuid] })) }))

      return {
        ...course[0],
        id: courseId,
        exerciseNumbers,
        students
      }
    }
    return { students: [{ exercises: [{}] }], exerciseNumbers: [] }
  }

  const arr2 = mapChildren(props.children, (c: any) => {
    if (c.type && c.type.name && c.type.name.toLowerCase() === 'chapter') {
      const clone = React.cloneElement(c, {
        numeral: props.numeral,
        count: exCount,
        ownCourse: betterCourse(),
        coursekey: showTrafficLight()
      })
      return clone
    }
    return c
  })

  return props.sectionId === props.courseTabId ? <div id="CourseSection">{arr2}</div> : <div style={{ display: 'none' }} />
}

const mapStateToProps = (state: {
  pageState: InitialState
  coursePageState: CoursePageState
  user: User | null
  adminPageState: AdminPageState
  exercises: ExercisesState
}) => ({
  courseTabId: Number(state.pageState.pageParams.pathParams.tabId),
  coursePageState: state.coursePageState,
  user: state.pageState.pageParams.user,
  ownCourses: state.adminPageState.ownCourses,
  courseId: state.pageState.pageParams.pathParams.id,
  courseVersion: state.pageState.pageParams.pathParams.version,
  allCourses: state.pageState.courses,
  exercises: state.exercises
})

const ConnectedCourseSection = connect(mapStateToProps)(CourseSection)

export default ConnectedCourseSection
