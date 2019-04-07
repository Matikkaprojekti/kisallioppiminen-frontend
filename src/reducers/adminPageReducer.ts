import { AdminPageState } from '../types/InitialState'
import * as R from 'ramda'

export const adminPageReducer = (state: AdminPageState | null = null, action: { type: string; data: any }): AdminPageState | null => {
  const { data } = action
  switch (action.type) {
    case 'SET_OWN_COURSES':
      if (state) {
        return R.merge(state, { ownCourses: data })
      }
      break
    case 'SET_TEACHER_COURSES':
      if (state) {
        return R.merge(state, { teacherCourses: data })
      }
      break
    case 'ADD_OWN_COURSE':
      if (state) {
        return R.merge(state, { ownCourses: [...state.ownCourses, data] })
      }
      break
    case 'ADD_TEACHER_COURSE':
      if (state) {
        return R.merge(state, {teacherCourses: [...state.teacherCourses, data]})
      }
  }

  return state
}
