import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderbyID, Order, fetchLaunchTrigger } from "../services/OrderService";
import { fetchProductById } from "../services/ProductService";
import ChangeState from "../components/ChangeStates";
import './css/OrdersDetail.css'


const OrdersDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true)
  const [productName, setProductName] = useState<string | null>(null);
  const [price, setPrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);


  useEffect(() => {
    fetchOrderbyID(Number(id))
      .then(async (data) => {
        setOrder(data);
        try {
          const product = await fetchProductById(Number(data.product));
          setProductName(product.name);
          setPrice(product.price * data.amount)
          setUnitPrice(Number(product.price))
        } catch (err) {
          console.error("No se pudo obtener el nombre del producto", err);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (!order) return <div className="spinner"></div>;


  const handleTrigger = async (trigger: string) => {
    setLoading(true);
    try {
      const updatedOrder = await fetchLaunchTrigger(Number(id), trigger);
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
          <p>Usuario: {order.user}</p>
          <p>Producto: {productName ?? order.product}</p>
          <p>Cantidad: {order.amount}</p>
          <p>Precio unitario del producto: ${unitPrice ?? order.product}</p>
          <p>Precio de la orden: ${price ?? order.product}</p>
          <p>Estado actual: {order.current_state}</p>
          <p>{order.active_ticket !== -1 && <li id="ticket">Support Ticket: #{order.active_ticket}</li>}</p>
          <ChangeState currentState={order.current_state} onTriggerClick={handleTrigger} />
        </div>
        <div className="order-log">
          <h2>Historial de estados</h2>
          <ul>
            {order.state_log.map((entry, index) => {
              const estado = Object.keys(entry)[0];
              const datos = entry[estado]

              return (
                <li key={index}>
                  <strong>{estado}</strong>
                  <ul>
                    <li>Evento: {datos.evento}</li>
                    <li>
                      Hora:{" "}
                      {new Date(datos.hora).toLocaleTimeString("es-CO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) +
                        " - " +
                        new Date(datos.hora).toLocaleDateString("es-CO")}
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );

}

export default OrdersDetailPage