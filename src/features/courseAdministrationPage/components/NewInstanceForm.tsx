import React, { useState, FormEvent } from 'react'
import { connect } from 'react-redux'
import { InitialState, Course } from '../../../types/InitialState'
import { ThunkDispatch } from 'redux-thunk'
import { TeachingInstance } from '../../../types/jsontypes'
import { createTeacherCourse as createTecherCourseAction } from '../../../reducers/actions/adminPageActions'

export default function NewInstanceForm() {
  const form = ({ pageState, createTeacherCourse }: { pageState: InitialState, createTeacherCourse: (teachingInstance: TeachingInstance) => Promise<void>}) => {
    const [selectedCourse, setSelectedCourse] = useState(pageState.courses[0])
    const [selectedVersion, setSelectedVersion] = useState(pageState.courses[0].courseContent[0].version)
    const [instanceName, setInstanceName] = useState('')
    const [courseKey, setCourseKey] = useState('')
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const endDt = new Date()
    endDt.setDate(endDt.getDate() + 30)
    const [endDate, setEndDate] = useState(endDt.toISOString().split('T')[0])

    const courseSelectorListener = (selection: string) => {
      const selected = pageState.courses.find(course => course.courseName === selection)
      if (selected !== undefined) {
        setSelectedCourse(selected)
        setSelectedVersion(selected.courseContent[0].version)
      }
    }

    const submitForm = (event: FormEvent) => {
      event.preventDefault()

      const instance = {
        coursekey: courseKey,
        name: instanceName,
        startdate: startDate,
        enddate: endDate,
        coursematerial_name: selectedCourse.courseName,
        version: selectedVersion
      }

      console.log('lähetys:')
      console.log(instance)
      console.log('vastaus:')

      createTeacherCourse(instance)

      clearForm()
    }

    const clearForm = () => {
      setInstanceName('')
      setSelectedCourse(pageState.courses[0])
      setSelectedVersion(selectedCourse.courseContent[0].version)
      setCourseKey('')
      setStartDate(new Date().toISOString().split('T')[0])
      setEndDate(endDt.toISOString().split('T')[0])
    }

    return (
      <div>
        <form onSubmit={submitForm}>
          <table>
            <tbody>
              <tr>
                <td>Kurssin nimi</td>
                <td>
                  <input type="text" value={instanceName} onChange={e => setInstanceName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>Kurssimateriaali</td>
                <td>
                  <select value={selectedCourse.courseName} onChange={e => courseSelectorListener(e.target.value)}>
                    {addCourses(pageState.courses)}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Materiaalin versio</td>
                <td>
                  <select value={selectedVersion} onChange={e => setSelectedVersion(e.target.value)}>
                    {addVersions(selectedCourse)}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Kurssiavain</td>
                <td>
                  <input type="text" value={courseKey} onChange={e => setCourseKey(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>Kurssi alkaa</td>
                <td>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>Kurssi päättyy</td>
                <td>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
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

  const addVersions = (course: Course) => course.courseContent.map(vrsn => <option key={vrsn.version}>{vrsn.version}</option>)

  const mapStateToProps = (state: { pageState: InitialState }) => ({
    pageState: state.pageState
  })

  const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    createTeacherCourse: async (teachingInstance: TeachingInstance) => {
      await dispatch(createTecherCourseAction(teachingInstance))
    }
  })

  const ConnectedNewInstanceForm = connect(mapStateToProps, mapDispatchToProps)(form)
  return <ConnectedNewInstanceForm />
}
