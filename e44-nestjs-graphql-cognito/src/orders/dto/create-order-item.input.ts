import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateOrderItemInput {
  @Field(() => ID)
  @IsUUID('4')
  productId: string;

  @Field(() => Int)
  @Max(100) // reasonable limit to avoid misuse
  @Min(1)
  @IsInt()
  quantity: number;
}
