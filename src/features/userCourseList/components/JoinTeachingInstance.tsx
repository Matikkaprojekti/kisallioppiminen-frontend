import React from 'react'

interface Props {
  handle: (event: any) => void
}

const JoinCourse = (props: Props) => {
  return (
    <div key={Math.random() * 10000}>
      <form onSubmit={event => props.handle(event)}>
        <div className="userCourseListPage-header">
          <label className="userCourseListPage-text">Liity kurssille:</label>
        </div>
        <div className="chapter-content">
          <input name="courseKey" className="userCourseListPage-enter" type="text" placeholder="Kurssiavain" />
          <button className="userCourseListPage-button" type="submit">
            Liity
          </button>
        </div>
      </form>
    </div>
  )
}

export default JoinCourse
