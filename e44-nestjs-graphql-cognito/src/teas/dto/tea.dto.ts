/* eslint-disable @typescript-eslint/no-inferrable-types -- code-first graphql schema generation needs the explicit type annotation even for inferred types */
import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Tea')
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

  @Field()
  currency: string = 'EUR';

  @Field()
  imageUrl: string;

  // TODO rating should probably be a derived value from ratings, with aggregated value duplicated to the tea entity
  @Field(() => Int)
  rating: number = 5;

  // TODO rating should probably be a derived value from ratings, with aggregated value duplicated to the tea entity
  @Field(() => Int)
  ratingCount: number = 8;

  @Field()
  description: string;
}
