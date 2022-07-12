import { Handler } from '@netlify/functions'
import axios from 'axios'

const { APIKEY, USERNAME, MODE } = process.env

const handler: Handler = async event => {
  const id = event.path.split('/').filter(p => p).reverse()[0]
  // console.log(event.headers['user-agent'], id)
  
  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'apikey': APIKEY as string,
      'username': USERNAME as string
    }
  })
  const { title, content, poster } = data

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8'
    },
    body: /* html */ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Heropy's Notion</title>

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Notion Clone!" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${content}" />
          <meta property="og:image" content="${poster}" />
          <meta property="og:url" content="https://charming-moonbeam-67283c.netlify.app/workspaces/${id}" />

          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="Notion Clone!" />
          <meta property="twitter:title" content="${title}" />
          <meta property="twitter:description" content="${content}" />
          <meta property="twitter:image" content="${poster}" />
          <meta property="twitter:url" content="https://charming-moonbeam-67283c.netlify.app/workspaces/${id}" />

          <link rel="icon" href="https://heropy.blog/css/images/logo.png">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          ${
            MODE === 'development' 
              ? '<script defer type="module" src="/src/main.ts"></script>'
              : '<script type="module" crossorigin src="/assets/index.js"></script><link rel="stylesheet" href="/assets/index.css">'
          }
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>`
  }
}
export { handler }
