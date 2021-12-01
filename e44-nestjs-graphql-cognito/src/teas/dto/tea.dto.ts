import { Authorize, FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { JwtPayload } from 'jsonwebtoken';

@ObjectType('Tea')
@Authorize({
  authorize: (context: { req: { user: JwtPayload } }) => {
    // TODO here the actual authorization fun happens in the future
    console.log(context.req.user?.sub);
    return {};
  },
})
export class TeaDto {
  @Field(() => ID)
  id: string;

  @FilterableField({ description: 'English name of the tea' })
  name: string;

  @FilterableField({ description: 'Price in USD' })
  price: number;

  @Field(() => Int, { description: 'Ideal brewing temperature' })
  bestAtTemperature: number;

  @FilterableField(() => String, {
    description: 'freetext tags for searchability',
  })
  tags: string;
}
