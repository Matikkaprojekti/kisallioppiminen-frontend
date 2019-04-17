import express from 'express'
import ReactServer from 'react-dom/server'

import { createApp } from '../features/application'
import { createTemplate } from './basePage'
import { resolveInitialState } from './initialStateResolver'

if (process.env.IS_BUILD === 'true') {
  process.env.KO_ENV = 'production'
}

const PORT = process.env.PORT || 3000

const server = express()
server.use(express.static('dist'))

server.get('*', (req, res) => {
  const path = req.path
  const url = req.query.p
  const initialState = url ? resolveInitialState(url) : resolveInitialState(path)
  const body = ReactServer.renderToString(createApp(initialState))
  const template = createTemplate({
    title: 'Kisällioppiminen.fi',
    body,
    initialState: JSON.stringify(initialState),
    styleSource: '"/css/style.css"',
    env: process.env.IS_BUILD === 'true' ? 'production' : String(process.env.KO_ENV)
  })

  res.send(template)
})

server.listen(PORT, () => {
  console.log('🚀  Server now listening on ', PORT)
  console.log('Env is', process.env.KO_ENV)
})
