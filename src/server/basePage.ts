export const createTemplate = ({
  title,
  body,
  initialState,
  isStatic,
  styleSource,
  env
}: {
  title: string
  body: string
  initialState: string
  isStatic?: boolean
  styleSource: string
  env: string
}) => {
  return `
  <!DOCTYPE html>
  <html>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // https://github.com/rafrex/spa-github-pages
      // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
      // ----------------------------------------------------------------------
      // This script checks to see if a redirect is present in the query string
      // and converts it back into the correct url and adds it to the
      // browser's history using window.history.replaceState(...),
      // which won't cause the browser to attempt to load the new url.
      // When the single page app is loaded further down in this file,
      // the correct url will be waiting in the browser's history for
      // the single page app to route accordingly.
      (function(l) {
        if (l.search) {
          var q = {};
          l.search.slice(1).split('&').forEach(function(v) {
            var a = v.split('=');
            q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
          });
          if (q.p !== undefined) {
            window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + (q.p || '') +
              (q.q ? ('?' + q.q) : '') +
              l.hash
            );
          }
        }
      }(window.location))
    </script>
    <div style="display: none" id="initial-state">${initialState}</div>
    <script>
      window.__koenv = "${env}"
    </script>
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
