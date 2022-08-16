import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { trpc } from '../utils/trpc'

export const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const client = trpc.useContext()
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries("questions.get-all-my-questions")
      if (!inputRef.current) return
      inputRef.current.value = ""
    }
  })
  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value })
          event.currentTarget.value = ""
        }
      }}>
    </input>
  )
}

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"])

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-col">
        <div>Questions</div>
        {data.map(question => {
          return (
            <Link href={`question/${question.id}`} key={question.id}>
              <a key={question.id}>
                <div
                  key={question.id}
                  className="my-2"
                >
                  {question.question}
                </div>
              </a>
            </Link>

          )
        })}
      </div>
      <QuestionCreator />
    </div>
  )
}

export default Home