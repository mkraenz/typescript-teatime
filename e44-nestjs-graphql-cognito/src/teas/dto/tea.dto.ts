import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TeaDto {
  @Field(() => ID)
  id: string;

  @Field({ description: 'English name of the tea' })
  name: string;

  @Field({ description: 'Price in USD' })
  price: number;

  @Field(() => Int, { description: 'Ideal brewing temperature' })
  bestAtTemperature: number;

  @Field(() => String, { description: 'freetext tags for searchability' })
  tags: string;
}
