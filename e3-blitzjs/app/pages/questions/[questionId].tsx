import updateChoice from "app/choices/mutations/updateChoice"
import Layout from "app/core/layouts/Layout"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import getQuestion from "app/questions/queries/getQuestion"
import { BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [updateChoiceMutation] = useMutation(updateChoice)
  const [question, { refetch }] = useQuery(getQuestion, { id: questionId })

  const handleVote = async (choiceId) => {
    await updateChoiceMutation({ id: choiceId })
    refetch()
  }

  return (
    <>
      <Head>
        <title>Question {question.text}</title>
      </Head>

      <div>
        <h1>Question: {question.text}</h1>
        <ul>
          {question.Choice.map((choice) => (
            <li key={choice.id}>
              {choice.text} - {choice.votes} votes
              <button onClick={() => handleVote(choice.id)}>Vote</button>
            </li>
          ))}
        </ul>

        <Link href={`/questions/${question.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteQuestionMutation({ id: question.id })
              router.push("/questions")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowQuestionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/questions">
          <a>Questions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Question />
      </Suspense>
    </div>
  )
}

ShowQuestionPage.authenticate = true
ShowQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowQuestionPage
