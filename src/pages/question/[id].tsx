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
      <div className="text-2xl font-bold">
        {data?.question}
      </div>
      <div>
        {(data?.options as string[])?.map((option, index) => {
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