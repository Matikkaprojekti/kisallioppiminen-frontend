import React from 'react'
import { InitialState, CoursePageState, User, Course, AdminPageState } from '../../../types/InitialState'
import { connect } from 'react-redux'
import { mapChildren } from 'idyll-component-children'
import { pageStateReducer } from '../../../reducers/pageStateReducer'
import { UserCourse } from '../../../types/jsontypes'

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
}) => {
  const exCount = { number: 0 }
  const { ownCourses, user, courseId, courseVersion, allCourses } = props
  const showTrafficLight = () => {
    const courseName = allCourses.filter(c => c.id === courseId)[0].courseName
    const course = ownCourses.filter(c => c.coursematerial_name === courseName && c.version === courseVersion)
    if (course.length === 0 || !user) {
      return null
    } else {
      return course[0].coursekey
    }
  }
  const arr2 = mapChildren(props.children, (c: any) => {
    if (c.type && c.type.name && c.type.name.toLowerCase() === 'chapter') {
      const clone = React.cloneElement(c, {
        numeral: props.numeral,
        count: exCount,
        ownCourses,
        coursekey: showTrafficLight()
      })
      return clone
    }
    return c
  })

  return props.sectionId === props.courseTabId ? <div id="CourseSection">{arr2}</div> : <div style={{ display: 'none' }} />
}

const mapStateToProps = (state: { pageState: InitialState; coursePageState: CoursePageState; user: User | null, adminPageState: AdminPageState }) => ({
  courseTabId: Number(state.pageState.pageParams.pathParams.tabId),
  coursePageState: state.coursePageState,
  user: state.pageState.pageParams.user,
  ownCourses: state.adminPageState.ownCourses,
  courseId: state.pageState.pageParams.pathParams.id,
  courseVersion: state.pageState.pageParams.pathParams.version,
  allCourses: state.pageState.courses
})

const ConnectedCourseSection = connect(mapStateToProps)(CourseSection)

export default ConnectedCourseSection
