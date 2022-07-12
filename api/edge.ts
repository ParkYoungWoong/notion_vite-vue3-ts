import axios from 'axios'
import isbot from 'isbot'
import { VercelRequest, VercelResponse } from '@vercel/node'

const { APIKEY, USERNAME, MODE } = process.env

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // console.log(request)
  const userAgent = request.headers['user-agent']
  const id = (request.url as string).split('/').filter(p => p).reverse()[0].split('?')[0]
  console.log(id)

  if (isbot(userAgent) && id) {
    console.log('Bot!!')

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

    return response
      .setHeader('content-type', 'text/html')
      .status(200)
      .json(/* html */ `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
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
        </head>
        <body></body>
        </html>
      `)
  }

  const url = MODE === 'development'
    ? `http://localhost:5009/workspaces/${id}`
    : `/workspaces/${id}`
  return response.redirect(url)
}
