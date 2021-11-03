import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('tea')
export class TeaDto {
  @Field(() => ID)
  id: string;

  @Field({ description: 'English name of the tea' })
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
