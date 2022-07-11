import { Handler } from '@netlify/functions'
import axios from 'axios'

const handler: Handler = async (event, context) => {
  const { id, method, data } = JSON.parse(event.body as string)
  await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`,
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'ParkYoungWoong'
    },
    data
  })
}
export { handler }
