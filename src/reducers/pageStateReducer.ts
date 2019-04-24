import { InitialState } from '../types/InitialState'

export const pageStateReducer = (state: InitialState | null = null, action: { type: string; data: any }): InitialState | null => {
  const { data } = action
  switch (action.type) {
    case 'SET_USER':
      if (state) {
        const { pageParams } = state
        return {
          ...state,
          pageParams: {
            ...pageParams,
            user: data
          }
        }
      }
      break
    case 'CHANGE_PAGE':
      if (data === 'http://localhost:8080/users/auth') {
        return state
      }
      if (typeof window !== 'undefined') {
        window.history.pushState({}, 'Kisällioppiminen', data)
        if (state) {
          const { pageParams } = state
          return {
            ...state,
            pageParams: {
              ...pageParams,
              path: data
            }
          }
        }
      }
      break
    case 'SELECT_COURSE_VERSION':
      if (typeof window !== 'undefined') {
        if (state) {
          const { pageParams } = state
          const courseId: string = pageParams.pathParams ? pageParams.pathParams.id : ''
          const pageurl = `/courses/${courseId}/version/${data}/tab/0`
          window.history.pushState({}, 'Kisällioppiminen', pageurl)
          return {
            ...state,
            pageParams: {
              ...pageParams,
              path: pageurl
            }
          }
        }
      }
      break
    case 'TOGGLE_ERROR':
      if (state) {
        return {
          ...state,
          error: data
        }
      }
  }
  return state
}
