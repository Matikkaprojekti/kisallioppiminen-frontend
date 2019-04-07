import { User } from '../../types/InitialState'
import userService from '../../services/userService'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

export class Action extends String {}

export const CHANGE_PAGE: Action = 'CHANGE_PAGE'

export const FETCH_USER: Action = 'FETCH_USER'

export const SET_USER: Action = 'SET_USER'

export const changePage = (page: string) => ({ type: CHANGE_PAGE, data: page })

export const fetchUser = (): ThunkAction<Promise<User>, {}, {}, AnyAction>  => {
  return async (dispatch) =>
    userService.login().then(user => {
      dispatch(setUser(user))
      return user
    })
}

export const setUser = (user: User) => ({ type: SET_USER, data: user })
