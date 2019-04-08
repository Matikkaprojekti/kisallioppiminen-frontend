import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CourseWrapper from './components/CourseWrapper'
import Scoreboard from '../courseAdministrationPage/components/Scoreboard'
import { UserCourse } from '../../types/jsontypes'
import JoinTeachingInstance from './components/JoinTeachingInstance'
import courseService from './../../services/courseService'
import { InitialState, CoursePageState, ExercisesState, Course, User } from '../../types/InitialState'
import { ThunkDispatch } from 'redux-thunk'
import { fetchOwnCourses as fetchOwnCoursesAction, joinTeachingInstance as joinTeachingInstanceAction } from '../../reducers/actions/courseActions'

interface Props {
  user: User
  ownCourses: UserCourse[]
  joinTeachingInstance: (coursekey: string) => Promise<void>
  fetchOwnCourses: () => Promise<void>
  exercises: ExercisesState
  allCourses: Course[]
}

export function userCourseListPage() {
  const addCourses = (courses: UserCourse[]) =>
    courses.map(course => (
      <CourseWrapper key={course.owner_id} header={course.name} coursekey={course.coursekey} startdate={course.startdate} enddate={course.enddate}>
        <Scoreboard course={course} />
      </CourseWrapper>
    ))

  const app = (props: Props) => {
    const { user, ownCourses, fetchOwnCourses, exercises, joinTeachingInstance } = props

    useEffect(() => {
      fetchOwnCourses()
    }, [])

    function handle(event: any) {
      event.preventDefault()
      joinTeachingInstance(event.target.courseKey.value)
    }

    console.log(ownCourses)
    const betterCourses = ownCourses.map(c => {
      const courseId = props.allCourses.filter(c2 => c.coursematerial_name === c2.courseName)
      if (
        courseId[0] !== undefined &&
        exercises !== null &&
        exercises.courseExercises !== null &&
        exercises.idToNumber !== null &&
        exercises.courseExercises[`${courseId[0].id} ${c.version}`] !== undefined
      ) {
        const exerciseNumbers = exercises.courseExercises[`${courseId[0].id} ${c.version}`].map(e => exercises.idToNumber[e])

        const students = c.students.map(s => ({ ...s, exercises: s.exercises.map(ex => ({ ...ex, uuid: exercises.idToNumber[ex.uuid] })) }))

        return {
          ...c,
          exerciseNumbers,
          students
        }
      }
      return { ...c, exerciseNumbers: [] }
    })

    return (
      <div className="courseAdministrationPageContainer">
        <JoinTeachingInstance handle={handle} />
        {addCourses(betterCourses)}
      </div>
    )
  }

  const mapStateToProps = (state: { userState: User; pageState: InitialState; coursePageState: CoursePageState; exercises: ExercisesState }) => ({
    user: state.userState,
    ownCourses: state.coursePageState.ownCourses,
    exercises: state.exercises,
    allCourses: state.pageState.courses
  })

  const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    joinTeachingInstance: async (coursekey: string) => {
      await dispatch(joinTeachingInstanceAction(coursekey))
    },
    fetchOwnCourses: async () => {
      await dispatch(fetchOwnCoursesAction())
    }
  })

  const ConnectedUserCourseListPage = connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)

  return <ConnectedUserCourseListPage />
}
