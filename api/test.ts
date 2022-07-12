import { VercelRequest, VercelResponse } from '@vercel/node'

const { APIKEY, USERNAME } = process.env

export default async function handler(request: VercelRequest, response: VercelResponse) {
  console.log(APIKEY, USERNAME, request.headers['user-agent'])
  response
    .status(200)
    .json({
      name: 'Heropy'
    })
}
