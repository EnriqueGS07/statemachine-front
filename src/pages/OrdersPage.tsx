import React, { useEffect, useState } from "react";
import { OrderCard } from "../components/OrderCard";
import { fetchOrders, Order } from "../services/OrderService";
import CreateOrder from "../components/CreateOrder";
import './css/OrdersPage.css'
import { ReactComponent as SunIcon } from '../assets/sol.svg';
import { ReactComponent as MoonIcon } from '../assets/luna.svg';


const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [lighMode, setLightMode] = useState<boolean>(() => {
        return localStorage.getItem("LightMode") === "true";
    });

    useEffect(() => {
        if (lighMode) {
            document.documentElement.classList.add("light-mode");
        } else {
            document.documentElement.classList.remove("light-mode");
        }
        localStorage.setItem("LightMode", String(lighMode));
    }, [lighMode]);

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
            <div className="theme-toggle">
                <MoonIcon className="theme-icon"></MoonIcon>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={lighMode}
                        onChange={() => setLightMode(prev => !prev)}
                    />
                    <span className="slider round"></span>
                </label>
                <SunIcon className="theme-icon"></SunIcon>
            </div>

            <h1>Gestor de Ordenes</h1>
            <div className="create-order-section">
                <CreateOrder onOrderCreated={handleNewOrder} />
            </div>
            <hr />
            <div className="order-list">
                {orders.map(order => (
                    <OrderCard key={order.id} {...order} />
                ))}
            </div>

        </div>
    )
}

export default OrdersPage