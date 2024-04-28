export interface Order {
  id: number;
  items: OrderItem[];
}
export interface OrderInput {
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
}
