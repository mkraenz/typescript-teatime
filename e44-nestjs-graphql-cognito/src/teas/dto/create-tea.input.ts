import { InputType, PickType } from '@nestjs/graphql';
import { TeaDto } from './tea.dto';

@InputType()
export class CreateTeaInput extends PickType(
  TeaDto,
  ['name', 'bestAtTemperature', 'price'],
  InputType,
) {}
