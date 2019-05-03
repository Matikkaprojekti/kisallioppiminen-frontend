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
  deleteInstance: (coursekey: string) => void
}

const AdminPageChapter = (props: Props) => {
  const [open, setOpen] = useState(false)
  const contentClassname = classnames('chapter-content', { 'chapter-content-hidden': open !== true })

  const toggleVisibility = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className="chapter" onClick={toggleVisibility}>
        <div className="course-admin-page">
          <label className="userCourseListPage-text">{props.header}</label>
          <label className="course-admin-page-key">{props.coursekey}</label>
          <label className="userCourseListPage-text">
            <Link href={props.material_url}>{props.material}</Link>
          </label>
          <label className="userCourseListPage-date">
            {format(props.startdate, 'DD-MM-YYYY')} - {format(props.enddate, 'DD-MM-YYYY')}
          </label>
          <button className="userCourseListPage-button" onClick={() => props.deleteInstance(props.coursekey)}>
            Poista instanssi
          </button>
        </div>
      </div>
      <div className={contentClassname}>{props.children}</div>
    </div>
  )
}

export default AdminPageChapter
