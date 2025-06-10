import React, { useEffect, useState } from "react";
import { OrderCard } from "../components/OrderCard";
import { fetchOrders, Order } from "../services/OrderService";

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const[loading, setLoading] = useState(true)
    
    useEffect(() =>{
        fetchOrders()
        .then(data => setOrders(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    },[])

    if (loading) return <p>Cargando ordenes...</p>
    console.log()
    return(
        <div>
            <h1>Ordenes</h1>
            <div>
                {orders.map(order => (
                    <OrderCard key={order.id} {...order} />
                ))}
            </div>
        </div>
    )
}

export default OrdersPage