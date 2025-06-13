import { Order } from "../services/OrderService";
import { useNavigate } from "react-router-dom";
import './css/ChangeState.css'

type ChangeStatesProps = {
  currentState: string;
  onTriggerClick: (trigger: string) => void;
};


const triggerMap: Record<string, string[]> = {
  Pending: ["pendingBiometricalVerification", "noVerificationNeeded", "orderCancelled", "paymentFailed", "orderCancelledByUser"],
  OnHold: ["biometricalVerificationSuccessful", "orderCancelledByUser", "verificationFailed"],
  PendingPayment: ["paymentSuccessful", "orderCancelledByUser"],
  Confirmed: ["preparingShipment", "orderCancelledByUser"],
  Processing: ["itemDispatched", "orderCancelledByUser"],
  Shipped: ["itemReceivedByCustomer", "deliveryIssue", "orderCancelledByUser"],
  Delivered: ["Returning"],
  Returning: ["returnInitiatedByCustomer", "orderCancelledByUser"],
  Returned: ["refundProcessed"],
  Refunded: [],
  Cancelled: [],
};

export const ChangeState: React.FC<ChangeStatesProps> = ({ currentState, onTriggerClick }) => {


  const availableTriggers = triggerMap[currentState] || [];

  return (
    <div>
      <h3>Acciones disponibles</h3>
      {availableTriggers.length === 0 ? (
        <p>No hay acciones disponibles.</p>
      ) : (
        availableTriggers.map((trigger) => (
          <button className="trigger" key={trigger} onClick={() => onTriggerClick(trigger)} style={{ margin: "0.5rem" }}>
            {trigger}
          </button>
        ))
      )}
    </div>
  );
};

export default ChangeState