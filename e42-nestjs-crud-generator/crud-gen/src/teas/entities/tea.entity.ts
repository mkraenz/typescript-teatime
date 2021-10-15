import { UpdateTeaDto } from '../dto/update-tea.dto';

export class Tea {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public tags: string,
    public price: number,
    public imageUrl: string,
    public stock: number,
  ) {}

  update(updateTeaDto: UpdateTeaDto) {
    this.name = updateTeaDto.name ?? this.name;
    this.description = updateTeaDto.description ?? this.description;
    this.tags = updateTeaDto.tags ?? this.tags;
    this.price = updateTeaDto.price ?? this.price;
    this.imageUrl = updateTeaDto.imageUrl ?? this.imageUrl;
    this.stock = updateTeaDto.stock ?? this.stock;
  }
}
