import React, { useState } from "react";
import { createOrder } from "../services/OrderService";
import './css/CreateOrder.css'

const CreateOrder: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState("");
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState(1);
    const [message, setMessage] = useState("");


    const toggleForm = () => {
        console.log("AAA")
        setShowForm(!showForm);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newOrder = await createOrder(user, product, amount);
            setMessage("Orden creada exitosamente");
            setUser("");
            setProduct("");
            setAmount(0);
        } catch (err) {
            console.error(err);
            setMessage("Error al crear la orden");
        }
    };

    return (
        <div>
          <button className="create-button" onClick={toggleForm}>
            Crear nueva orden
          </button>
        
        {showForm && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Nueva Orden</h2>
                    <button className="close-button" onClick={toggleForm}>x</button>
                    <form onSubmit={handleSubmit}>
                      <div>
                            <label>Usuario</label>
                            <input
                              type="text"
                              value={user}
                              onChange={(e) => setUser(e.target.value)}
                              required
                            />
                        </div>
                        <div>
                            <label>Producto</label>
                            <input
                              type="text"
                              value={product}
                              onChange={(e) => setProduct(e.target.value)}
                              required
                            />
                        </div>
                        <div>
                            <label>Cantidad</label>
                            <input
                              type="number"
                              value={amount}
                              min={1}
                              onChange={(e) => setAmount(Number(e.target.value))}
                              required
                            />
                        </div>
                        <button className="create-button" type="submit">Crear Orden</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </div>
        )}
        </div>
    );

};

export default CreateOrder;
