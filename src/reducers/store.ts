import { combineReducers, createStore, applyMiddleware } from 'redux'
import { pageStateReducer } from './pageStateReducer'
import { InitialState, CoursePageState, ExercisesState, AdminPageState } from '../types/InitialState'
import { coursePageReducer, exerciseReducer } from './courseReducer'
import thunk from 'redux-thunk'
import { adminPageReducer } from './adminPageReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  pageState: pageStateReducer,
  coursePageState: coursePageReducer,
  exercises: exerciseReducer,
  adminPageState: adminPageReducer
})

export const initStore = ({
  pageState,
  coursePageState,
  exercises,
  adminPageState
}: {
  pageState: InitialState
  coursePageState: CoursePageState
  exercises: ExercisesState
  adminPageState: AdminPageState
}) => createStore(reducer, { pageState, coursePageState, exercises, adminPageState }, composeWithDevTools(applyMiddleware(thunk))
)
