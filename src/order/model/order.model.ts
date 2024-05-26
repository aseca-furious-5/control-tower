import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface Order {
  id: number;
  items: OrderItem[];
  status: string;
}

export class OrderInput {
  @IsNotEmpty()
  items: OrderItemInput[];
}

export class OrderItemInput {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class OrderItem {
  id: number;
  name: string;
  quantity: number;
}

export class OrderUpdateInput {
  @IsString()
  @IsNotEmpty()
  status: string;
}
