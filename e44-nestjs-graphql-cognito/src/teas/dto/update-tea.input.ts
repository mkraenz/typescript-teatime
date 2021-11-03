import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateTeaInput } from './create-tea.input';

@InputType()
export class UpdateTeaInput extends PartialType(CreateTeaInput) {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  tags?: string;
}
