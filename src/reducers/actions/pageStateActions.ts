import { User } from '../../types/InitialState'
import userService from '../../services/userService'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

export class Action extends String {}

export const CHANGE_PAGE: Action = 'CHANGE_PAGE'

export const FETCH_USER: Action = 'FETCH_USER'

export const SET_USER: Action = 'SET_USER'

export const TOGGLE_ERROR: Action = 'TOGGLE_ERROR'

export const changePage = (page: string) => ({ type: CHANGE_PAGE, data: page })

export const fetchUser = (): ThunkAction<Promise<User>, {}, {}, AnyAction> => {
  return async dispatch =>
    userService.login().then(user => {
      dispatch(setUser(user))
      return user
    })
}

export const toggleError = (message: string, visible: boolean) => ({
  type: TOGGLE_ERROR,
  data: { message, visible }
})

export const setErrorMessage = (message: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async dispatch => {
    dispatch(toggleError(message, true))
    setTimeout(() => dispatch(toggleError('', false)), 5000)
  }
}

export const setUser = (user: User) => ({ type: SET_USER, data: user })
