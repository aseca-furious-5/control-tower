import { Body, Controller, Post } from '@nestjs/common';
import { Order, OrderInput } from '../model/order.model';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  createOrder(@Body() orderInput: OrderInput): Promise<Order> {
    return this.service.createOrder(orderInput);
  }
}
