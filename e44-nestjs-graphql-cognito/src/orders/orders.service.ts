import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { TeasService } from '../teas/teas.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly teasSvc: TeasService,
    private connection: Connection,
  ) {}

  async create(dto: CreateOrderInput, userId: string) {
    const order = this.ordersRepo.create(dto);
    order.userId = userId;
    await this.setItemPrices(order);
    return this.save(order);
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

  private async save(order: Order) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const item of order.items) {
        await queryRunner.manager.save(item);
      }
      const savedOrder = await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
