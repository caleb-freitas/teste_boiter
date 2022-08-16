import { useRouter } from "next/router"
import { trpc } from "../../utils/trpc"

type QuestionPageContentProps = {
  id: string
}

const QuestionPageContent: React.FC<QuestionPageContentProps> = (props: QuestionPageContentProps) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.get-by-id", { id: props.id }])

  if (!isLoading && !data) {
    return <div>Question not found</div>
  }

  return (
    <div className="p-8 flex flex-col">
      {data?.isOwner && <div className="bg-red-700 rounded-md p-5">You made this question</div>}
      <div className="text-2xl font-bold">
        {data?.question?.question}
      </div>
      <div>
        {(data?.question?.options as string[])?.map((option, index) => {
          return (
            <div key={index}>
              {option}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const QuestionPage = () => {
  const { query } = useRouter()
  const { id } = query

  if (!id || typeof id !== "string") {
    return <div>No ID</div>
  }

  return (
    <QuestionPageContent id={id} />
  )
}

export default QuestionPage