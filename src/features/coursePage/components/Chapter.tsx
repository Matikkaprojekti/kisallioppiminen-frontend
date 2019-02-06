import React, { useState } from 'react'
import classnames from 'classnames'

interface Props {
  header: string,
  content: string,
  openedBoxes: {[index: string]: boolean}
}

const Chapter = (props: any) => {
  const [open, setOpen] = useState(false)
  const contentClassname = classnames('chapter_content', { 'chapter_content-hidden': open !== true })

  return (
    <div>
      <div className="chapter" onClick={() => setOpen(!open)}>
        {props.header}
      </div>
      <div id="testi" className={contentClassname}>
        {props.children}
        <div className="close_chapter" onClick={() => setOpen(!open)}>
          Sulje kappale
        </div>
      </div>
    </div>
  )
}

export default Chapter
