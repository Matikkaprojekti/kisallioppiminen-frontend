import React, { useState } from 'react'

export function NavBottom() {
  const [openExercise, setOpenExercise] = useState(false)
  const changeExerciseVisibility = () => {
    setOpenExercise(!openExercise)
    if (openExercise) {
      Array.from(document.getElementsByClassName('exercise-content')).forEach(element => {
        if (element !== undefined) {
          element.className = 'exercise-content exercise-content-hidden'
        }
      })
    } else {
      Array.from(document.getElementsByClassName('exercise-content exercise-content-hidden')).forEach(element => {
        if (element !== undefined) {
          element.className = 'exercise-content'
        }
      })
    }
  }
  const [openAll, setOpenAll] = useState(false)
  const changeAllVisibility = () => {
    setOpenExercise(!openExercise)
    if (openExercise) {
      Array.from(document.getElementsByClassName('chapter-content')).forEach(element => {
        if (element !== undefined) {
          element.className = 'chapter-content-hidden'
        }
      })
    } else {
      Array.from(document.getElementsByClassName('chapter-content-hidden')).forEach(element => {
        if (element !== undefined) {
          element.className = 'chapter-content'
        }
      })
      Array.from(document.getElementsByClassName('exercise-content exercise-content-hidden')).forEach(element => {
        if (element !== undefined) {
          element.className = 'exercise-content'
        }
      })
    }
  }

  return (
    <div className="navigatorBottom">
      <span className="navigatorBottom-item">
        Tehtävät
        <label className="switch">
          <input type="checkbox" onClick={changeExerciseVisibility} />
          <span className="toggle" />
        </label>
      </span>
      <span className="navigatorBottom-item">
        Avaa kaikki
        <label className="switch">
          <input type="checkbox" onClick={changeAllVisibility} />
          <span className="toggle" />
        </label>
      </span>
      <a className="navigatorBottom-scroll-up" href="#">
        ⬆
      </a>
    </div>
  )
}

export default NavBottom
