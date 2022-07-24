import { InputType, PickType } from '@nestjs/graphql';
import { CartDto } from './cart.dto';

@InputType()
export class CreateCardInput extends PickType(CartDto, ['userId'], InputType) {}

// TODO E58 continue here
// userId can be inferred from the context (req.user)
// addItem(userId, item): Cart!
// deleteItem(userId, item): Cart!
// updateItemAmount(userId, item): Cart!

// user perspective
/**
 * add a new item
 * delete an existing item
 * change the amount of an existing item
 */
