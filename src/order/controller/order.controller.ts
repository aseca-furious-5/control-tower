import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Order, OrderInput, OrderUpdateInput } from '../model/order.model';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {
  }

  @Post()
  createOrder(@Body() orderInput: OrderInput): Promise<Order> {
    return this.service.createOrder(orderInput);
  }

  @Put('/:orderId')
  updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateInput: OrderUpdateInput,
  ): Promise<Order> {
    return this.service.updateOrderStatus(orderId, updateInput.status);
  }

  @Get('/all')
  getAllOrders(): Promise<Order[]> {
    return this.service.getAllOrders();
  }

  @Get('/:orderId')
  getOrderById(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<Order> {
    return this.service.getOrderById(orderId);
  }


  @Post('/:orderId/dispatch')
  async dispatchOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<void> {
    await this.service.dispatchOrder(orderId);
  }
}
