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
      <label htmlFor="tehtavat" className="navigatorBottom-item">
        Tehtävät
      </label>
      <input type="checkbox" id="tehtavat" onClick={changeExerciseVisibility} />
      {/*
      <label htmlFor="teoria" className="navigatorBottom-item">
        Teoria
      </label>
      <input type="checkbox" id="teoria" />
      */}
      <label htmlFor="avaakaikki" className="navigatorBottom-item">
        Avaa kaikki
      </label>
      <input type="checkbox" id="avaakaikki" onClick={changeAllVisibility} />
      <a className="navigatorBottom-scroll-up" href="#">
        ⬆
      </a>
    </div>
  )
}

export default NavBottom
