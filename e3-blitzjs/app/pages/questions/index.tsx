import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"
import { BlitzPage, Head, Link, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link href={`/questions/${question.id}`}>
              <a>{question.text}</a>
            </Link>
            <ul>
              {question.Choice.map((choice) => (
                <li key={choice.id}>
                  {choice.text} - {choice.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const QuestionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div>
        <p>
          <Link href="/questions/new">
            <a>Create Question</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsList />
        </Suspense>
      </div>
    </>
  )
}

QuestionsPage.authenticate = true
QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
