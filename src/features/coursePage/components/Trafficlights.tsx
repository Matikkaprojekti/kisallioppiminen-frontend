import React, { Fragment } from 'react'
import Emoji from 'react-emoji-render'
import courseService from '../../../services/courseService'

export default function Trafficlights({ updateColor, coursekey, UUID }: { updateColor: any; coursekey: string; UUID: string }) {
  const handleClick = async (status: string) => {
    try {
      await courseService.trafficlight(coursekey, UUID, status)
      updateColor(status)
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }
  return (
    <Fragment>
      <div className="mitenTehtavaMeni">Miten tehtävä meni?</div>
      <div className="trafficlight-container">
        <span onClick={() => handleClick('green')}>
          <Emoji className="clickable trafficlight trafficlight-green" text=":)" />
        </span>
        <span onClick={() => handleClick('yellow')}>
          <Emoji className="clickable trafficlight trafficlight-yellow" text=":|" />
        </span>
        <span onClick={() => handleClick('red')}>
          <Emoji className="clickable trafficlight trafficlight-red" text=":(" />
        </span>
      </div>
    </Fragment>
  )
}
