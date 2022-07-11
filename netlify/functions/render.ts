import { Handler } from '@netlify/functions'
import axios from 'axios'

const { APIKEY, USERNAME, NODE_ENV } = process.env

const handler: Handler = async event => {
  // console.log('event.path::', event.path)
  // '/workspaces/AWEUIRJLASJKNFaskdhjbfksj'
  // params => ['workspaces', 'AWEUIRJLASJKNFaskdhjbfksj']
  const params = event.path.split('/').filter(p => p)
  const { data } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${params[1]}`,
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
          <meta property="og:url" content="https://charming-moonbeam-67283c.netlify.app/${params[1]}" />

          <link rel="icon" href="https://heropy.blog/css/images/logo.png">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          ${
            NODE_ENV === 'development' 
              ? '<script defer type="module" src="/src/main.ts"></script>'
              : '<script type="module" crossorigin src="/assets/index.2d56ede1.js"></script><link rel="stylesheet" href="/assets/index.006a7ba0.css">'
          }
        </head>
        <body>
          <div id="app">
            <!-- <App /> -->
          </div>
          
        </body>
      </html>`
  }
}
export { handler }
