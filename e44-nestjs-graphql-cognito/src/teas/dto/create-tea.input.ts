import { InputType, PickType } from '@nestjs/graphql';
import { TeaDto } from './tea.dto';

// TODO understand why update and create include more props than specified in the pick array
@InputType()
export class CreateTeaInput extends PickType(
  TeaDto,
  ['name', 'bestAtTemperature', 'price', 'imageUrl', 'description'],
  InputType,
) {}
