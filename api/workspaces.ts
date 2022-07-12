import axios from 'axios'
import { VercelRequest, VercelResponse } from '@vercel/node'

const { APIKEY, USERNAME } = process.env

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { id, method, data } = JSON.parse(request.body as string)
  const { data: returnValue } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': APIKEY as string,
      'username': USERNAME as string
    },
    data
  })
  response
    .status(200)
    .json(returnValue)
}
