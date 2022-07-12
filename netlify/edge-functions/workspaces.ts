import isbot from 'https://cdn.skypack.dev/isbot'
import { Context } from 'netlify:edge'

const APIKEY = Deno.env.get('APIKEY') as string
const USERNAME = Deno.env.get('USERNAME') as string

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get('user-agent')
  const id = request.url.split('/').filter(p => p).reverse()[0]
  console.log(id)
  
  if (isbot(userAgent) && id) {
    console.log('Bot!!')

    // `fetch`는 Deno에 내장되어 있습니다.
    const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'apikey': APIKEY,
        'username': USERNAME
      }
    })
    const { title, content, poster } = await res.json()

    return new Response(
      /* html */ `
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
      `, 
      {
        headers: { 'content-type': 'text/html' }
      }
    )
  }
  return await context.next()
}
