export const resolveUri = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.host
    return host === 'matikkaprojekti.github.io' ? 'https://ko-interface.herokuapp.com' : 'http://localhost:8080'
  }

  if (process.env.IS_BUILD === 'true') {
    return 'https://ko-interface.herokuapp.com'
  }
  return 'https://localhost:8080'
}

export const resolveAuthUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.host
    return host === 'matikkaprojekti.github.io' ? 'https://ko-be-staging.herokuapp.com/users/auth' : 'http://localhost:8000/users/auth'
  }

  if (process.env.IS_BUILD === 'true') {
    return 'https://ko-be-staging.herokuapp.com/users/auth'
  }

  return 'http://localhost:8000/users/auth'
}
