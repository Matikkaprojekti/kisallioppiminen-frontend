import React, { useEffect } from 'react'
import { InitialState, Course, CoursePageState, User } from '../../types/InitialState'
import IdyllDocument from 'idyll-document'
import * as components from 'idyll-components'
import compiler, { Node } from 'idyll-compiler'
import CourseMenu from './components/CourseMenu'
import CourseTab from './components/CourseTab'
import CourseNumberer from './components/CourseNumberer'
import CourseSection from './components/CourseSection'
import Chapter from './components/Chapter'
import CourseVersionSelector from './components/CourseVersionSelector'
import { connect } from 'react-redux'
import Exercise from './components/Exercise'
import Answer from './components/Answer'
import Theorem from './components/Theorem'
import Proof from './components/Proof'
import Definition from './components/Definition'
import Picture from './components/Picture'
import Math from './components/Math'
import NavBottom from '../baseComponents/NavBottom'
import { ThunkDispatch } from 'redux-thunk'
import { fetchOwnCourses as fetchOwnCoursesAction } from '../../reducers/actions/adminPageActions'

export function coursePage() {
  const availableComponents = {
    ...components,
    CourseNumberer,
    CourseMenu,
    CourseTab,
    CourseSection,
    Chapter,
    Exercise,
    Answer,
    Theorem,
    Proof,
    Definition,
    Picture,
    Math
  }

  const mapStateToProps = (state: { userState: User; pageState: InitialState; coursePageState: CoursePageState }) => ({
    userState: state.userState,
    pageState: state.pageState,
    coursePageState: state.coursePageState,
    user: state.pageState.pageParams.user
  })

  const coursePageApp = (props: { pageState: InitialState; coursePageState: CoursePageState; fetchOwnCourses: () => Promise<void>; user: User | null }) => {
    const { pageState, coursePageState, fetchOwnCourses, user } = props
    const courseToRender = resolveCourse(pageState)
    const courseMaterialVersion = resolveCourseVersion(pageState, courseToRender)
    useEffect(() => {
      if (user) {
        fetchOwnCourses()
      }
    }, [])
    return (
      <div className="coursePageContainer">
        <div className="courseVersionSelectorContainer">
          <CourseVersionSelector versions={courseToRender !== undefined ? courseToRender.courseContent.map(c => c.version) : []} />
        </div>
        {typeof window !== 'undefined' ? (
          <IdyllDocument markup={courseMaterialVersion ? courseMaterialVersion.content : ''} components={availableComponents} />
        ) : (
          <IdyllDocument ast={compiler(courseMaterialVersion ? courseMaterialVersion.content : '', { async: false }) as Node[]} components={availableComponents} />
        )}
        <NavBottom />
      </div>
    )
  }

  const ConnectedCoursePage = connect(
    mapStateToProps,
    mapDispatchToProps
  )(coursePageApp)
  return <ConnectedCoursePage />
}

function resolveCourse({ pageParams, courses }: InitialState) {
  const { pathParams } = pageParams
  if (pathParams.id) {
    return courses.find(({ id }) => id === pathParams.id)
  }
  return undefined
}

function resolveCourseVersion({ pageParams }: InitialState, course?: Course) {
  const { pathParams } = pageParams
  return course
    ? course.courseContent.find(content => {
        return String(content.version) === pathParams.version
      }) || course.courseContent[0]
    : undefined
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchOwnCourses: async () => {
    await dispatch(fetchOwnCoursesAction())
  }
})
