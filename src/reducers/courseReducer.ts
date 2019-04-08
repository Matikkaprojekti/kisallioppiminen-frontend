import { CoursePageState, ExercisesState } from '../types/InitialState'
import * as R from 'ramda'

export const coursePageReducer = (state: CoursePageState | null = null, action: { type: string; data: any }): CoursePageState | null => {
  const { data } = action
  switch (action.type) {
    case 'SELECT_COURSE_VERSION':
      if (state) {
        return R.merge(state, { selectedCourseVersion: data })
      }
      break
  }

  return state
}

export const exerciseReducer = (state: ExercisesState | null = null, action: { type: string; data: any }): ExercisesState | null => {
  return state
}
