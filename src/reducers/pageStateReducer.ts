import { InitialState } from '../types/InitialState'

export const pageStateReducer = (state: InitialState | null = null, action: { type: string; data: any }): InitialState | null => {
  const { data } = action
  switch (action.type) {
    case 'SET_USER':
      console.log(action)
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
    case 'CHANGE_PAGE':
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
  }
  return state
}
