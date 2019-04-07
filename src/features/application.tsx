import React from 'react'
import { InitialState, CoursePageState, ExercisesState, AdminPageState } from '../types/InitialState'
import Footer from './baseComponents/Footer'
import Navigation from './baseComponents/Navigation'
import Hero from './baseComponents/Hero'
import { getPage, watchPageChanges } from '../routes'
import { Provider, connect } from 'react-redux'
import { initStore } from '../reducers/store'
import { Store } from 'redux'
import { fetchUser } from '../reducers/actions/pageStateActions'

export function createApp(initialState: { pageState: InitialState; coursePageState: CoursePageState; exercises: ExercisesState, adminPageState: AdminPageState }) {
  const store = initStore(initialState)
  watchPageChanges(store)
  resolveTokenCallback(store)

  const mapStateToProps = (state: { pageState: InitialState; coursePageState: CoursePageState }) => {
    return { initialState: state.pageState }
  }

  const app = (props: { initialState: InitialState }) => {
    const { initialState: state } = props
    const { component, pageName } = resolvePageToRender(state)
    return (
      <React.Fragment>
        <Navigation />
        <Hero location={pageName} />
        {component}
        <Footer />
      </React.Fragment>
    )
  }

  const ConnectedApp = connect(mapStateToProps)(app)

  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  )
}

function resolvePageToRender(initialState: InitialState) {
  const { pageParams } = initialState
  const { path } = pageParams
  const page = getPage(path)

  if (page === undefined) {
    return { component: <h1>404 Not found :(</h1>, pageName: 'Not found' }
  }

  initialState.pageParams.pathParams = page.pathParams
  const { component, pageName } = page

  return { component: component(), pageName }
}

function resolveTokenCallback(store: Store<{ pageState: InitialState | null }, any>) {
  if (typeof window !== 'undefined') {
    if (window.location.search.startsWith('?token')) {
      const token = window.location.search.split('=')[1]
      window.localStorage.setItem('ko_token', token)
      store.dispatch(fetchUser())
      // Remove token from url bar
      window.history.pushState({}, 'Kisällioppiminen', '/')
    }
  }
}
