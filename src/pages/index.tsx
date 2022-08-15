import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["getAllQuestions"])

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div>
      {data.map(question => {
        return (
          <div key={question.id}>
            {question.question}
          </div>
        )
      })}
    </div>
  )
}

export default Home
