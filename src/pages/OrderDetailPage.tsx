import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderbyID, Order, fetchLaunchTrigger } from "../services/OrderService";
import ChangeState from "../components/ChangeStates";

const OrdersDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const[loading, setLoading] = useState(true)
    

    useEffect(() =>{
        fetchOrderbyID(Number(id))
        .then(data => setOrder(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    },[])

    if (!order) return <div>Cargando...</div>;


    const handleTrigger = async (trigger: string) => {
      setLoading(true);
      try {
        const updatedOrder = await fetchLaunchTrigger(Number(id), trigger);
        console.log(updatedOrder)
        setOrder(updatedOrder); 
      } catch (err) {
        console.error("Error al cambiar el estado:", err);
      } finally {
        setLoading(false);
      }
      
    };
    return(
        <div>
            <button onClick={() => navigate("/")}>← Volver a la página principal</button>
            <h1>Order #{order.id}</h1>
            <p>Usuario: {order.user}</p>
            <p>Producto: {order.product}</p>
            <p>Cantidad: {order.amount}</p>
            <p>Estado: {order.current_state}</p>
            <div>
              <ul>
                {Object.entries(order.state_log).map(([estado, datos], index) => (
                  <li key={index}>
                    <strong>{estado}</strong>
                    <ul>
                      {Object.entries(datos).map(([clave, valor], subIndex) => (
                        <li key={subIndex}>
                          {clave}: {String(valor)}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ChangeState currentState={order.current_state} onTriggerClick={handleTrigger} />
            </div>
        </div>
    )
}

export default OrdersDetailPage