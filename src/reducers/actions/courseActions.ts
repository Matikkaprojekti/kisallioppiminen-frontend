import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import courseService from '../../services/courseService'

export const SELECT_COURSE_VERSION = 'SELECT_COURSE_VERSION'

export const selectCourseVersion = (version: string) => ({ type: SELECT_COURSE_VERSION, data: version })
