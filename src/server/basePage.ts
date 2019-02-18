export const createTemplate = ({
  title,
  body,
  initialState,
  isStatic,
  styleSource
}: {
  title: string
  body: string
  initialState: string
  isStatic?: boolean
  styleSource: string
}) => {
  return `
  <!DOCTYPE html>
  <html>
    <div style="display: none" id="initial-state">${initialState}</div>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <link rel="stylesheet" type="text/css" href=${styleSource}>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
    <script src="${!isStatic ? '/js/client.js' : 'client.js'}" defer></script>
  </html>
  `
}
