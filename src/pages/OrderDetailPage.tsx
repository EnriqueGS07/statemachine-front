import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderbyID, Order, fetchLaunchTrigger } from "../services/OrderService";
import ChangeState from "../components/ChangeStates";
import './css/OrdersDetail.css'


const OrdersDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchOrderbyID(Number(id))
      .then(data => setOrder(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [])

  if (!order) return <div className="spinner"></div>;


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
  return (
    <div className="order-detail-page">
      <button className="back-button" onClick={() => navigate("/")}>← Volver a la página principal</button>
      <div className="order-content">
        <div className="order-details">
          <h1>Orden #{order.id}</h1>
          <p><strong>Usuario:</strong> {order.user}</p>
          <p><strong>Producto:</strong> {order.product}</p>
          <p><strong>Cantidad:</strong> {order.amount}</p>
          <p><strong>Estado actual:</strong> {order.current_state}</p>
          <ChangeState currentState={order.current_state} onTriggerClick={handleTrigger} />
        </div>  
        <div className="order-log">
          <h2>Historial de estados</h2>
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
      </div>
    </div>
  );

}

export default OrdersDetailPage