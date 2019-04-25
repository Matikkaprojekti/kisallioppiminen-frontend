import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AdminPageChapter from './components/AdminPageChapter'
import Scoreboard from './components/Scoreboard'
import NewInstanceForm from './components/NewInstanceForm'
import { ExercisesState, Course, CoursePageState, InitialState, AdminPageState } from './../../types/InitialState'
import { UserCourse, TeachingInstance } from '../../types/jsontypes'
import { ThunkDispatch } from 'redux-thunk'
import { fetchTeacherCourses as fetchTeacherCoursesAction, createTeacherCourse as createTeacherCourseAction } from '../../reducers/actions/adminPageActions'

export function courseAdministrationPage() {
  const [open, setOpen] = useState(false)
  const formClass = open ? 'newInstanceForm-visible' : 'newInstanceForm-hidden'
  const buttonText = open ? 'Sulje lomake' : 'Uusi kurssi'

  const app = ({
    exercises,
    allCourses,
    fetchTeacherCourses,
    teacherCourses
  }: {
    exercises: ExercisesState
    allCourses: Course[]
    fetchTeacherCourses: () => Promise<void>
    teacherCourses: UserCourse[]
  }) => {
    useEffect(() => {
      fetchTeacherCourses()
    }, [])

    function deleteInstance(coursekey: string) {
      console.log('Hieno funktio')
    }

    const addCourses = (betterCourses: UserCourse[]) =>
      betterCourses.map((course: UserCourse) => (
        <AdminPageChapter
          key={course.coursekey}
          header={course.name}
          coursekey={course.coursekey}
          startdate={course.startdate}
          enddate={course.enddate}
          material={course.coursematerial_name}
          material_url={`/courses/${course.id}/version/${course.version}/tab/0`}
          deleteInstance={deleteInstance}
        >
          <Scoreboard course={course} />
        </AdminPageChapter>
      ))

    const betterCourses = teacherCourses.map(c => {
      const course = allCourses.filter(c2 => c.coursematerial_name === c2.courseName)[0]
      if (course && exercises !== null && exercises.courseExercises !== null && exercises.idToNumber !== null) {
        const exerciseNumbers = exercises.courseExercises[`${course.id} ${c.version}`].map(e => exercises.idToNumber[e])

        // Jos kurssilla ei ole opiskelijoita, niin opiskelijalista on syytä asettaa tyhjäksi.
        if (c.students === undefined) {
          c.students = []
        }

        const students = c.students.map(s => ({ ...s, exercises: s.exercises.map(ex => ({ ...ex, uuid: exercises.idToNumber[ex.uuid] })) }))

        return {
          ...c,
          id: course.id,
          exerciseNumbers,
          students
        }
      }
      return { ...c, exerciseNumbers: [] }
    })

    const displayForm = () => setOpen(!open)

    return (
      <div>
        <div className={formClass}>
          <NewInstanceForm />
        </div>
        <div className="courseAdministrationPageContainer">
          <div className="courseAdministrationPageContainer-heading">
            <button className="newCourseButton" onClick={displayForm}>
              {buttonText}
            </button>
            <h2>Kurssiesi tulostaulut:</h2>
          </div>
          {addCourses(betterCourses)}
        </div>
      </div>
    )
  }

  const mapStateToProps = ({
    exercises,
    pageState,
    adminPageState
  }: {
    exercises: ExercisesState
    pageState: InitialState
    allCourses: Course[]
    adminPageState: AdminPageState
  }) => {
    return { exercises, allCourses: pageState.courses, teacherCourses: adminPageState.teacherCourses }
  }

  const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    fetchTeacherCourses: async () => {
      await dispatch(fetchTeacherCoursesAction())
    }
  })

  const ConnectedCourseAdministrationPage = connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)

  return <ConnectedCourseAdministrationPage />
}
