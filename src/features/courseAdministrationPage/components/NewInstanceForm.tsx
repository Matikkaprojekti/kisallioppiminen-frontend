import React, { useState, FormEvent } from 'react'
import { connect } from 'react-redux'
import { InitialState, Course, AdminPageState } from '../../../types/InitialState'
import { ThunkDispatch } from 'redux-thunk'
import { TeachingInstance } from '../../../types/jsontypes'
import { createTeacherCourse as createTecherCourseAction, setNewInstanceFormValue } from '../../../reducers/actions/adminPageActions'
import { setErrorMessage as setErrorMessageAction } from '../../../reducers/actions/pageStateActions'

export default function NewInstanceForm() {
  const form = ({
    pageState,
    createTeacherCourse,
    setErrorMessage,
    setFormValue,
    formData
  }: {
    pageState: InitialState,
    formData: TeachingInstance
    createTeacherCourse: (teachingInstance: TeachingInstance) => Promise<void>
    setErrorMessage: (message: string) => Promise<void>
    setFormValue: (value: { [key: string]: any }) => void
  }) => {

      const { name, coursematerial_name, version, coursekey, startdate, enddate } = formData

      const selectedCourse = pageState.courses.find(({courseName}) => courseName === coursematerial_name)

      const submitForm = (event: FormEvent) => {
        event.preventDefault()

        if (!coursekey.trim()) {
          return setErrorMessage('Kurssiavain ei saa olla tyhjä')
        }

        if (!name.trim()) {
          return setErrorMessage('Kurssi nimi ei saa olla tyhjä')
        }

        if (!enddate || !startdate) {
          return setErrorMessage('Alku- ja loppupäivämäärät pitää olla määritelty')
        }

        if (enddate < startdate) {
          return setErrorMessage('Loppupäivämäärän pitää olla alkupäivämäärän jälkeen')
        }

        const instance = {
          coursekey: coursekey.trim(),
          name: name.trim(),
          startdate,
          enddate,
          coursematerial_name,
          version
        }

        return createTeacherCourse(instance)
          .then(() => setFormValue({
            name: '',
            coursematerial_name,
            version,
            coursekey: '',
            startdate: new Date().toISOString().split('T')[0],
            enddate: new Date().toISOString().split('T')[0]
          }))
      }

      return (
        <div>
          <form onSubmit={submitForm}>
            <table>
              <tbody>
                <tr>
                  <td>Kurssin nimi</td>
                  <td>
                    <input type="text" value={name} onChange={e => setFormValue({name: e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>Kurssimateriaali</td>
                  <td>
                    <select value={coursematerial_name} onChange={e => setFormValue({coursematerial_name: e.target.value})}>
                      {addCourses(pageState.courses)}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Materiaalin versio</td>
                  <td>
                    <select value={version} onChange={e => setFormValue({version: e.target.value})}>
                      {addVersions(selectedCourse)}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Kurssiavain</td>
                  <td>
                    <input type="text" value={coursekey} onChange={e => setFormValue({coursekey: e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>Kurssi alkaa</td>
                  <td>
                    <input type="date" value={startdate} onChange={e => setFormValue({startdate: e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>Kurssi päättyy</td>
                  <td>
                    <input type="date" value={enddate} onChange={e => setFormValue({enddate: e.target.value})} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="submit" value="Luo kurssi" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )
  }

  const addCourses = (courses: Course[]) => courses.map(course => <option key={course.id}>{course.courseName}</option>)

  const addVersions = (course?: Course) => course ? course.courseContent.map(vrsn => <option key={vrsn.version}>{vrsn.version}</option>) : ''

  const mapStateToProps = (state: { pageState: InitialState, adminPageState: AdminPageState }) => ({
    pageState: state.pageState,
    formData: state.adminPageState.newInstanceForm
  })

  const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    createTeacherCourse: async (teachingInstance: TeachingInstance) => {
      await dispatch(createTecherCourseAction(teachingInstance))
    },
    setErrorMessage: async (message: string) => {
      await dispatch(setErrorMessageAction(message))
    },
    setFormValue: (value: { [key: string]: any }) => {
      dispatch(setNewInstanceFormValue(value))
    }
  })

  const ConnectedNewInstanceForm = connect(
    mapStateToProps,
    mapDispatchToProps
  )(form)
  return <ConnectedNewInstanceForm />
}
