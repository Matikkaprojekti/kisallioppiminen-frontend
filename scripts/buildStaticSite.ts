import ReactServer from 'react-dom/server'
import { resolveInitialState } from '../src/server/initialStateResolver'
import { createApp } from '../src/features/application'
import { writeFileSync } from 'fs'
import { createTemplate } from '../src/server/basePage'

const initialState = resolveInitialState('/')
const app = createApp(initialState)
const staticHtml = ReactServer.renderToString(app)
const wrappedHtml = createTemplate({
  title: 'Kisällioppiminen.fi',
  body: staticHtml,
  initialState: JSON.stringify(initialState),
  isStatic: true,
  styleSource: '"./css/style.css"',
  env: process.env.IS_BUILD === 'true' ? 'production' : String(process.env.KO_ENV)
})

writeFileSync('./dist/static/index.html', wrappedHtml)
