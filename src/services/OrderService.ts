export type Order = {
    id: number;
    user: string;
    product: string;
    amount: number;
    current_state: string,
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
    throw new Error("Error al obtener la orded {id}");
  }
  return res.json();
}

export async function fetchLaunchTrigger(id:number, trigger: any): Promise<Order> {
  const res = await fetch(`http://localhost:8000/api/orders/${id}/update-state/`,{
  method:"PUT",
  headers:{
    "Content-Type": "application/json",
  },
  body: JSON.stringify({trigger: trigger})
  });

  if (!res.ok) {
    throw new Error("Error al cambiar el estado");
  }
  return res.json();
}

