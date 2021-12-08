import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeasService } from '../teas/teas.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly teasSvc: TeasService,
  ) {}

  async create(dto: CreateOrderInput) {
    const order = this.ordersRepo.create(dto);
    await this.setItemPrices(order);
    return this.ordersRepo.save(order);
  }

  private async setItemPrices(order: Order) {
    const sortedTeaIds = order.items.map((i) => i.productId);
    const teas = await this.teasSvc.findAllOrFail(sortedTeaIds);
    order.items.forEach((item) => {
      const tea = teas.find((t) => t.id === item.productId);
      if (!tea) {
        // Note: this shouldnt have happened
        throw new Error(`Tea with id ${item.productId} not found`);
      }
      item.unitPrice = tea.price;
    });
  }
}
