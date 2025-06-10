export type Order = {
    id: number;
    user: string;
    product: string;
    amount: number;
    state_log: { [key: string]: any }
};

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch("http://localhost:8000/api/orders/");
  if (!res.ok) {
    throw new Error("Error al obtener las órdenes");
  }
  return res.json();
}

export async function fetchOrderbyID(id:number): Promise<Order> {
  const res = await fetch(`http://localhost:8000/api/orders/${id}/`);
  if (!res.ok) {
    throw new Error("Error al obtener las órdenes");
  }
  return res.json();
}

