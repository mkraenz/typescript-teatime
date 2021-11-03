import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeaInput } from './dto/create-tea.input';
import { TeaDto } from './dto/tea.dto';
import { UpdateTeaInput } from './dto/update-tea.input';
import { TeasService } from './teas.service';

@Resolver(() => TeaDto)
export class TeasResolver {
  constructor(private readonly teasService: TeasService) {}

  @Mutation(() => TeaDto)
  createTea(@Args('createTeaInput') input: CreateTeaInput) {
    return this.teasService.create(input);
  }

  @Query(() => [TeaDto], { name: 'teas' })
  findAll() {
    return this.teasService.findAll();
  }

  @Query(() => TeaDto, { name: 'tea' })
  findOne(@Args('id') id: string) {
    return this.teasService.findOne(id);
  }

  @Mutation(() => TeaDto)
  updateTea(@Args('updateTeaInput') input: UpdateTeaInput) {
    return this.teasService.update(input.id, input);
  }

  @Mutation(() => TeaDto)
  removeTea(@Args('id') id: string) {
    return this.teasService.remove(id);
  }
}
