import React, { useEffect, useState } from "react";
import { OrderCard } from "../components/OrderCard";
import { fetchOrders, Order } from "../services/OrderService";
import CreateOrder from "../components/CreateOrder";
import './css/OrdersPage.css'

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
            .then(data => { setOrders(data) })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return (<div className="spinner"></div>
    )

    const handleNewOrder = (newOrder: Order) => {
        setOrders(prev => [...prev, newOrder]);
    };

    return (
        <div className="order-page">
            <h1>Gestor de Ordenes</h1>
            <div className="create-order-section">
                <CreateOrder onOrderCreated={handleNewOrder} />
            </div>
            <hr/>
            <div className="order-list">
                {orders.map(order => (
                    <OrderCard key={order.id} {...order} />
                ))}
            </div>

        </div>
    )
}

export default OrdersPage