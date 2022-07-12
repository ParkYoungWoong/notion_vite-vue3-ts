import axiod from 'https://deno.land/x/axiod/mod.ts'
import isbot from 'https://cdn.skypack.dev/isbot'
import { Context } from 'netlify:edge'

export default async (request: Request, context: Context) => {
  const APIKEY = Deno.env.get('APIKEY') as string
  const USERNAME = Deno.env.get('USERNAME') as string
  const userAgent = request.headers.get('user-agent')
  const id = request.url.split('/').at(-1)
  console.log('id:', id)
  
  let data
  if (id) {
    const res = await axiod({
      url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'apikey': APIKEY,
        'username': USERNAME
      }
    })
    data = res.data
  }
  const { title, content, poster } = data

  if (isbot(userAgent)) {
    console.log('bot!!')
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
          <meta property="og:url" content="https://charming-moonbeam-67283c.netlify.app/${id}" />
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
