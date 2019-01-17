export const createTemplate = ({
  title,
  body,
  initialState
}: {
  title: string
  body: string
  initialState: string
}) => {
  return `
  <!DOCTYPE html>
  <html>
    <div style="display: none" id="initial-state">${initialState}</div>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!-- Import materialize.css -->
      <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
      <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
    </head>
    <body style="margin:0">
    <!-- Import jQuery before materialize.js -->
      <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
      <div id="app">${body}</div>
    </body>
    <script src="/js/client.js" defer></script>
  </html>
  `
}
