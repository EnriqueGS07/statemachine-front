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
          console.log(data.product)
          const product = await fetchProductById(Number(data.product));
          console.log(product)
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
          <p><strong>Producto:</strong> {productName ?? order.product}</p>
          <p><strong>Cantidad:</strong> {order.amount}</p>
          <p><strong>Precio unitario del producto:</strong> ${unitPrice ?? order.product}</p>
          <p><strong>Precio de la orden:</strong> ${price ?? order.product}</p>
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