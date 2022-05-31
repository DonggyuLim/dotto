const NEXT_PUBLIC_GRAPHQL_API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql'

const fetchGraphQL = async (text: any) => {
  const response = await fetch(NEXT_PUBLIC_GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: text,
    }),
  })
  return await response.json()
}

export default fetchGraphQL
