export type Order = {
  id: number;
  user: string;
  product: string;
  amount: number;
  current_state: string,
  state_log: { [key: string]: any }
};

const apiUrl = process.env.REACT_APP_API_LAMBDA_URL;

export async function fetchOrders(): Promise<Order[]> {
  console.log(apiUrl);
  const res = await fetch(`${apiUrl}/api/orders/`);
  if (!res.ok) {
    throw new Error("Error al obtener las órdenes");
  }
  return res.json();
}

export async function fetchOrderbyID(id:number): Promise<Order> {
  const res = await fetch(`${apiUrl}/api/orders/${id}/`);
  if (!res.ok) {
    throw new Error("Error al obtener la orded {id}");
  }
  return res.json();
}

export async function fetchLaunchTrigger(id:number, trigger: any): Promise<Order> {
  const res = await fetch(`${apiUrl}/api/orders/${id}/update-state/`,{
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

export async function createOrder(user: string, product: string, amount: number): Promise<Order> {
  const res = await fetch("https://6kmadpw0j5.execute-api.us-east-1.amazonaws.com/dev/api/orders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, product, amount }),
  });

  if (!res.ok) {
    throw new Error("Error al crear la orden");
  }

  return res.json();
}

