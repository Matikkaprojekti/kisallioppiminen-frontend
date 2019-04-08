import React, { useState } from 'react'
import classnames from 'classnames'
import { mapChildren } from 'idyll-component-children'
import format from 'date-fns/format'

interface Props {
  header: string
  content: string
  openedBoxes: { [index: string]: boolean }
}

const CourseWrapper = (props: any) => {
  const [open, setOpen] = useState(false)
  const contentClassname = classnames('chapter-content', { 'chapter-content-hidden': open !== true })
  const start = props.count ? props.count.number : 0

  const toggleVisibility = () => {
    if (props.count) {
      props.count.number = start
    }
    setOpen(!open)
  }

  let arr = props.children
  if (props.count && props.children && props.children[0].type) {
    arr = mapChildren(props.children, (c: any) => {
      return c
    })
  }
  return (
    <div>
      <div className="chapter" onClick={toggleVisibility}>
        <label className="userCourseListPage-text">{props.header}</label>
        <label className="userCourseListPage-date">
          {format(props.startdate, 'DD-MM-YYYY')} - {format(props.enddate, 'DD-MM-YYYY')}
        </label>
        <button className="userCourseListPage-button" onClick={props.leaveInstance}>
          Poistu kurssilta
        </button>
        <label className="userCourseListPage-key">{props.coursekey}</label>
      </div>
      <div className={contentClassname}>{arr}</div>
    </div>
  )
}

export default CourseWrapper
