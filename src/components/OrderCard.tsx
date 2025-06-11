import { Order } from "../services/OrderService";
import { useNavigate } from "react-router-dom";

export const OrderCard: React.FC<Order> = ({id, user, product, amount, current_state}) => {


    const navigate = useNavigate();

    return(
    <div>
        <h2>Orden #{id}</h2>
        <ul>
            <li>Cliente: {user}</li>
            <li>Producto: {product}</li>
            <li>Cantidad: {amount}</li>
            <li>Estado: {current_state}</li>
        </ul>
        <button onClick={() => navigate(`/orders/${id}`)}>Gestionar</button>
    </div>
    )
};

export default OrderCard