import React, { useState } from 'react'
import classnames from 'classnames'
import Trafficlights from './Trafficlights'

const Exercise = (props: any) => {
  const [open, setOpen] = useState(props.open)
  const [color, setColor] = useState('whitesmoke')
  const contentClassname = classnames('exercise-content', { 'exercise-content-hidden': open !== true })

  const updateColor = (color: string) => {
    if (color === 'red' || color === 'yellow' || color === 'green') {
      setColor(color)
    }
  }

  return (
    <div>
      <div style={{ backgroundColor: color }} className="exercise" onClick={() => setOpen(!open)}>
        {props.header}
      </div>
      <div className={contentClassname}>
        {props.children}
        {props.coursekey ? <Trafficlights updateColor={updateColor} coursekey={props.coursekey} UUID={props.UUID} /> : null}
      </div>
    </div>
  )
}

export default Exercise
