import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { Tea } from './entities/tea.entity';

@Injectable()
export class TeasService {
  private teas: Tea[] = [];

  create(dto: CreateTeaDto) {
    const tea = new Tea(
      v4(),
      dto.name,
      dto.description,
      dto.tags,
      dto.price,
      dto.imageUrl,
      dto.stock,
    );
    this.teas.push(tea);
    return tea;
  }

  findAll() {
    return this.teas;
  }

  findOne(id: string) {
    return this.teas.find((tea) => tea.id === id);
  }

  update(id: string, updateTeaDto: UpdateTeaDto) {
    const tea = this.findOne(id);
    if (!tea) {
      throw new NotFoundException(`No tea with id: ${id}`);
    }
    tea.update(updateTeaDto);
    return tea;
  }

  remove(id: string) {
    const filteredTeas = this.teas.filter((tea) => tea.id !== id);
    if (filteredTeas.length === this.teas.length) {
      throw new NotFoundException(`No tea with id: ${id}`);
    }
    this.teas = filteredTeas;
  }
}
