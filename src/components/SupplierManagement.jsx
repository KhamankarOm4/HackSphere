import React, { useState, useEffect } from 'react';
import DemandForecast from './DemandForecast';

const SupplierManagement = ({ medicines, onUpdateMedicine }) => {
  const [suppliers] = useState([
    { id: 1, name: 'PharmaCo Supplies', email: 'orders@pharmaco.com', phone: '(555) 123-4567', rating: 4.8 },
    { id: 2, name: 'MediCare Distribution', email: 'supply@medicare.com', phone: '(555) 234-5678', rating: 4.5 },
    { id: 3, name: 'HealthPharm Wholesale', email: 'orders@healthpharm.com', phone: '(555) 345-6789', rating: 4.9 },
    { id: 4, name: 'Global Med Supply', email: 'sales@globalmed.com', phone: '(555) 456-7890', rating: 4.6 }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'low_stock', message: 'Paracetamol stock below threshold', urgent: true },
    { id: 2, type: 'prediction', message: 'Amoxicillin likely to reach minimum in 2 weeks', urgent: false },
    { id: 3, type: 'supplier', message: 'Order placed with PharmaCo Supplies', urgent: false }
  ]);

  const [loading, setLoading] = useState(true);

  const handlePlaceOrder = (supplier, medicine) => {
    alert(`Order placed with ${supplier.name} for ${medicine.name}`);
  };

  useEffect(() => {
    
  }, []);

  console.log(medicines);

  const generateForecasts = async () => {
    setLoading(true);
    // ... existing code ...
    setLoading(false);
  };

  const formatPrice = (price) => {
    return `${window.getComputedStyle(document.documentElement).getPropertyValue('--currency-symbol')}${price}`;
  };

  return (
    <div className="supplier-management">
      <div className="predictive-alerts">
        <h3>Stock Alerts & Predictions</h3>
        <div className="alerts-container">
          {notifications.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.urgent ? 'urgent' : ''}`}>
              <span className={`alert-icon ${alert.type}`}></span>
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="suppliers-list">
        <h3>Approved Suppliers</h3>
        <div className="suppliers-grid">
          {suppliers.map(supplier => (
            <div key={supplier.id} className="supplier-card">
              <div className="supplier-header">
                <h4>{supplier.name}</h4>
                <span className="rating">★ {supplier.rating}</span>
              </div>
              <div className="supplier-details">
                <p>📧 {supplier.email}</p>
                <p>📞 {supplier.phone}</p>
              </div>
              <button 
                className="order-btn" 
                onClick={() => handlePlaceOrder(supplier, medicines[0])}
              >
                Place Order
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="stock-thresholds">
        <h3>Stock Thresholds</h3>
        <div className="threshold-cards">
          {medicines.map(medicine => (
            <div key={medicine.id} className="threshold-card">
              <div className="medicine-info">
                <h4>{medicine.name}</h4>
                <p>Current Stock: {medicine.quantity}</p>
              </div>
              <div className="threshold-settings">
                <label>Minimum Stock Level:</label>
                <input 
                  type="number" 
                  defaultValue={100}
                  min="0"
                  onChange={(e) => onUpdateMedicine(medicine.id, {
                    ...medicine,
                    minStock: parseInt(e.target.value)
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <DemandForecast medicines={medicines} />

      <div className="demand-forecast">
        <h3>AI-Powered Demand Forecast</h3>
        {loading ? (
          <p>Loading forecasts...</p>
        ) : (
          <div className="forecast-grid">
            {/* ... existing code ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierManagement; 