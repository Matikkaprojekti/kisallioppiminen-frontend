export const resolveUri = () => {
  const env = typeof window !== 'undefined' ? (window as any).__koenv : process.env.KO_ENV
  if (env === 'production') {
    return 'https://ko-interface.herokuapp.com'
  } else if (env === 'dev') {
    return 'http://localhost:8080'
  } else if (env === 'test') {
    return 'https://ko-proxy-mock.herokuapp.com'
  }

  return 'https://localhost:8080'
}

export const resolveAuthUrl = () => {
  const env = typeof window !== 'undefined' ? (window as any).__koenv : process.env.KO_ENV
  if (typeof window !== 'undefined') {
    const host = window.location.host
    return host === 'matikkaprojekti.github.io' ? 'https://ko-be-staging.herokuapp.com/users/auth' : 'http://localhost:8080/users/auth'
  }

  if (env === 'production') {
    return 'https://ko-be-staging.herokuapp.com/users/auth'
  } else if (env === 'dev') {
    return 'http://localhost:8000/users/auth'
  } else if (env === 'test') {
    return 'https://ko-be-staging.herokuapp.com/users/auth'
  }

  return 'http://localhost:8000/users/auth'
}

export const resolveInitialPath = (path?: string) => {
  if (typeof window !== 'undefined') {
    if (!path) {
      return window.location.pathname
    }
  }
  return path ? path : '/'
}
