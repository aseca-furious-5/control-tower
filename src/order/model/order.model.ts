export interface Order {
  id: number;
  items: Record<string, any>[];
}
export interface OrderInput {
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
}
