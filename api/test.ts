import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  console.log(request.headers['user-agent'])
  response
    .status(200)
    .json({
      name: 'Heropy'
    })
}
