import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateQuestion = z
  .object({
    id: z.number(),
    text: z.string(),
    Choice: z.array(z.object({ id: z.number().optional(), text: z.string() }).nonstrict()),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateQuestion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question = await db.question.update({
      where: { id },
      data: {
        ...data,
        Choice: {
          upsert: data.Choice.map((choice) => ({
            where: { id: choice.id ?? 0 },
            create: { text: choice.text },
            update: { text: choice.text },
          })),
        },
      },
    })

    return question
  }
)
