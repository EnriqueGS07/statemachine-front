import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderbyID, Order } from "../services/OrderService";

const OrdersDetailPage: React.FC = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
        const[loading, setLoading] = useState(true)
    

    useEffect(() =>{
        fetchOrderbyID(Number(id))
        .then(data => setOrder(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    },[])

    if (!order) return <div>Cargando...</div>;

    return(
        <div>
            <h1>{order.id}</h1>
        </div>
    )
}

export default OrdersDetailPage