import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateQuestion = z
  .object({
    text: z.string(),
    Choice: z.array(z.object({ text: z.string() })),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateQuestion), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const question = await db.question.create({
    data: {
      text: input.text,
      Choice: { create: input.Choice },
    },
  })

  return question
})
