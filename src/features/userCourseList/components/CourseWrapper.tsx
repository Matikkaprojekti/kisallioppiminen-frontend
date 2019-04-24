import React, { useState } from 'react'
import classnames from 'classnames'
import format from 'date-fns/format'
import Link from '../../baseComponents/Link'

interface Props {
  header: string
  material: string
  material_url: string
  children: any
  startdate: string
  enddate: string
  coursekey: string
  leaveInstance: (coursekey: string) => void
}

const CourseWrapper = (props: Props) => {
  const [open, setOpen] = useState(false)
  const contentClassname = classnames('chapter-content', { 'chapter-content-hidden': open !== true })

  const toggleVisibility = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className="chapter">
        <div className="userCourseListPage-container">
          <label onClick={toggleVisibility} className="userCourseListPage-text">
            {props.header}
          </label>
          <label onClick={toggleVisibility} className="userCourseListPage-text">
            <Link href={props.material_url}>{props.material}</Link>
          </label>
          <label onClick={toggleVisibility} className="userCourseListPage-date">
            {format(props.startdate, 'DD-MM-YYYY')} - {format(props.enddate, 'DD-MM-YYYY')}
          </label>
          <button className="userCourseListPage-button" onClick={() => props.leaveInstance(props.coursekey)}>
            Poistu kurssilta
          </button>
          <label onClick={toggleVisibility} className="course-admin-page-key">
            {props.coursekey}
          </label>
        </div>
      </div>
      <div className={contentClassname}>{props.children}</div>
    </div>
  )
}

export default CourseWrapper
