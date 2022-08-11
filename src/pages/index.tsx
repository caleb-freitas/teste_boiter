import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["getAllQuestions"])

  if (isLoading || !data) return <div>Loading...</div>

  console.log(data)

  return <div>{data[0]?.question}</div>
}

export default Home
