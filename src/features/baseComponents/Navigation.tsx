import React from 'react'
import Link from './Link'
import userService from '../../services/userService'
import { InitialState, User } from '../../types/InitialState'
import { fetchUser } from '../../reducers/actions/pageStateActions'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { resolveUri, resolveAuthUrl } from '../../utils/environmentResolvers'

interface Props {
  user: User | null
  fetchUser: () => Promise<void>
}

const logout = () => {
  console.warn('Logging out...')
  localStorage.clear()

  console.info('Done.')
}

class Navigation extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    const url = resolveAuthUrl()
    const { user } = this.props
    return (
      <nav className="navigator">
        <ul>
          <li className="navigator-item">
            <Link className="navigator-link" href="/">
              Materiaalit
            </Link>
          </li>
          <li className="navigator-item">
            <a className="navigator-link" href="https://blogs.helsinki.fi/kisallioppiminenlukiossa/">
              Blogi
            </a>
          </li>
          <li className="navigator-item">
            <Link className="navigator-link" href="/tietoa">
              Tietoa
            </Link>
          </li>
          {user ? (
            <li className="navigator-item">
              <div className="dropdown">
                <Link className="navigator-link" href={url}>
                  {`Hei, ${user.name}`}
                </Link>
                <div className="dropdown-content">
                  <Link className="dropdown-content-link" href="/courseAdmin">
                    Kurssihallinta
                  </Link>
                  <Link className="dropdown-content-link" href="/omat">
                    Omat kurssit
                  </Link>
                  <a className="dropdown-content-link" onClick={() => logout()} href="/">
                    Kirjaudu ulos
                  </a>
                </div>
              </div>
            </li>
          ) : (
            <li className="navigator-item">
              <div className="dropdown">
                {/*onClick={setUser()}*/}
                <a className="navigator-link" href={url}>
                  Kirjaudu sisään
                </a>
              </div>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

const setUser = () => {
  return () => {
    const foo = userService.login()
    return undefined
  }
}

const mapStateToProps = (state: { pageState: InitialState }) => ({
  user: state.pageState.pageParams.user
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchUser: async () => {
    await dispatch(fetchUser())
  }
})

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default ConnectedNavigation
