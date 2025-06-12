import { Order } from "../services/OrderService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/ProductService";
import './css/OrderCard.css'

export const OrderCard: React.FC<Order> = ({ id, user, product, amount, current_state }) => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");

    useEffect(() => {
        fetchProductById(Number(product))
            .then((data) => {
                setProductName(data.name);
            })
            .catch((err) => {
                console.error("Error al obtener producto:", err);
                setProductName("Desconocido");
            });
    }, [product]);

    return (
        <div className="order-card">
            <h2>Orden #{id}</h2>
            <ul>
                <li>Cliente: {user}</li>
                <li>Producto: {productName}</li>
                <li>Cantidad: {amount}</li>
                <li>Estado: {current_state}</li>
            </ul>
            <button onClick={() => navigate(`/orders/${id}`)}>Gestionar</button>
        </div>
    )
};

export default OrderCard