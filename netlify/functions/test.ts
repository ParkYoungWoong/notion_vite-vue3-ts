import { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
  console.log('event, context:', event, context)
  return {
    statusCode: 200,
    body: JSON.stringify({
      heropy: 'Heropy?!'
    })
  }
}
export { handler }
