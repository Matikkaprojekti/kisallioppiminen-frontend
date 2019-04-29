import React, { useState } from 'react'

export function NavBottom() {
  const [openExercise, setOpenExercise] = useState(true)
  const changeExerciseVisibility = () => {
    setOpenExercise(!openExercise)
    if (openExercise) {
      Array.from(document.getElementsByClassName('exercise')).forEach(element => {
        if (element !== undefined) {
          element.className = 'exercise-hidden'
        }
      })
      Array.from(document.getElementsByClassName('exercise-content')).forEach(element => {
        if (element !== undefined) {
          element.className = 'exercise-content-hidden'
        }
      })
    } else {
      Array.from(document.getElementsByClassName('exercise-hidden')).forEach(element => {
        if (element !== undefined) {
          element.className = 'exercise'
        }
      })
    }
  }
  const [openTheory, setOpenTheory] = useState(true)
  const changeTheoryVisibility = () => {
    setOpenTheory(!openTheory)
    if (openTheory) {
      Array.from(document.getElementsByClassName('chapter-content')).forEach(element => {
        if (element.children !== undefined) {
          Array.from(element.children).forEach(e => {
            const tags = ['DIV', 'P', 'UL', 'OL', 'IMG', 'SPAN', 'H3', 'H2', 'H1']
            const classNames = ['close-chapter', 'exercise', 'exercise-content', 'exercise-hidden', 'exercise-content-hidden']
            if (tags.includes(e.tagName) && !classNames.includes(e.className)) {
              if ((e.children === undefined || e.children.length === 0) || (e.children !== undefined && e.children.length > 0 && !classNames.includes(e.children[0].className))) {
                e.setAttribute('style', 'display: none;')
              }
            }
          })
        }
      })
    } else {
      Array.from(document.getElementsByClassName('chapter-content')).forEach(element => {
        if (element.children !== undefined) {
          Array.from(element.children).forEach(e => {
            const tags = ['DIV', 'P', 'UL', 'OL', 'IMG', 'SPAN', 'H3', 'H2', 'H1']
            const classNames = ['close-chapter', 'exercise', 'exercise-content', 'exercise-hidden', 'exercise-content-hidden']
            if (tags.includes(e.tagName) && !classNames.includes(e.className)) {
              e.setAttribute('style', 'display: block;')
            }
          })
        }
      })
    }
  }
  const [openAll, setOpenAll] = useState(false)
  const changeAllVisibility = () => {
    setOpenAll(!openAll)
    if (openAll) {
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
    }
  }

  return (
    <div className="navigatorBottom">
      <span className="navigatorBottom-item">
        Tehtävät
        <label className="switch">
          <input type="checkbox" onClick={changeExerciseVisibility} defaultChecked />
          <span className="toggle" />
        </label>
      </span>
      <span className="navigatorBottom-item">
        Teoria
        <label className="switch">
          <input type="checkbox" onClick={changeTheoryVisibility} defaultChecked />
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
