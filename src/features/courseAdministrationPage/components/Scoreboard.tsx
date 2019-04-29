import React from 'react'
import Light from './Light'
import { Student, Exercise } from '../../../types/jsontypes'

const Scoreboard = ({ course }: { course: { version: string; students: Student[]; exerciseNumbers: string[]; coursekey: string; coursematerial_name: string } }) => {
  const { students } = course
  const numberToOrder: { [i: string]: number } = {}
  let index = 0
  course.exerciseNumbers.forEach(num => {
    numberToOrder[num] = index
    index++
  })

  const makeGrays = (exercise: Exercise) => {
    const grays: JSX.Element[] = []
    while (numberToOrder[exercise.uuid] !== index && index < course.exerciseNumbers.length) {
      grays.push(
        <td key={Math.random() * 100000}>
          <Light color="gray" />
        </td>
      )

      index++
    }

    index++
    return grays
  }

  const makeGraysEnd = () => {
    const grays: JSX.Element[] = []
    while (index < course.exerciseNumbers.length) {
      grays.push(
        <td key={Math.random() * 10000000}>
          <Light color="gray" />
        </td>
      )

      index++
    }

    index++
    return grays
  }

  const zeroIndex = () => {
    index = 0
  }

  const addTableData = (exercises: Exercise[]) =>
    exercises.map(exercise => (
      <React.Fragment key={`${exercise.uuid} ${Math.random() * 10000} fragment`}>
        {makeGrays(exercise)}
        <td key={`${exercise.uuid} ${Math.random() * 10000}`}>
          <Light color={exercise.status} />
        </td>
      </React.Fragment>
    ))

  const sortExercises = (student: { exercises: Exercise[] }) => {
    student.exercises = student.exercises.filter((e1: Exercise) => {
      return e1.uuid
    })

    student.exercises = student.exercises.sort((e1: Exercise, e2: Exercise) => numberToOrder[e1.uuid] - numberToOrder[e2.uuid])
  }
  // A better unique key for the tr-elements is probably needed!
  const createTableRows = () => {
    if (students && students.length > 0) {
      // students is undefined when joining teachinginstance!
      return students.map((student: Student) => (
        <tr key={`${student.firstname} ${Math.random() * 10000}`}>
          <td>{`${student.firstname} ${student.lastname} `}</td>
          {zeroIndex()}
          {sortExercises(student)}
          {addTableData(student.exercises)}
          {makeGraysEnd()}
        </tr>
      ))
    } else {
      return [
        <tr key={1}>
          <td key={2}>Kurssilla ei ole opiskelijoita</td>
        </tr>
      ]
    }
  }

  return (
    <div className="scoreboard">
      <table>
        <tbody>
          <tr>
            <th> </th>
            {course.exerciseNumbers.map((e: string) => (
              <th key={`${e} ${course.coursematerial_name} ${course.version} ${course.coursekey}`}>{e}</th>
            ))}
          </tr>
          {createTableRows()}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard
