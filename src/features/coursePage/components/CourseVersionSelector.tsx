import React from 'react'
import { selectCourseVersion as selectCourse } from '../../../reducers/actions/courseActions'
import { connect } from 'react-redux'
import { InitialState, CoursePageState } from '../../../types/InitialState'

function CourseVersionSelector({
  versions,
  selectCourseVersion,
  coursePageState,
  pageState
}: {
  versions: string[]
  selectCourseVersion: typeof selectCourse
  coursePageState: CoursePageState
  pageState: InitialState
}) {
  // Option key should have better value?
  return (
    <div>
      <p>Valitse kurssin versio:</p>
      <select className="course-selector-box" onChange={e => handleOnChange(e, selectCourseVersion)} defaultValue={pageState.pageParams.pathParams.version || ''}>
        {versions.map(v => {
          return <option key={v.toString()}>{v}</option>
        })}
      </select>
    </div>
  )
}

function handleOnChange(e: any, hook: typeof selectCourse) {
  hook(e.target.value)
}

const mapStateToProps = (state: { coursePageState: CoursePageState; pageState: InitialState }) => ({
  coursePageState: state.coursePageState,
  pageState: state.pageState
})
const mapDispatchToProps = {
  selectCourseVersion: selectCourse
}

const ConnectedCourseVersionSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseVersionSelector)

export default ConnectedCourseVersionSelector
