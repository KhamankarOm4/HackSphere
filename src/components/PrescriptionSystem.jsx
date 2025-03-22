import React, { useState, useEffect } from 'react';
import '../styles/designSystem.css';
import './PrescriptionSystem.css';

const PrescriptionSystem = ({ medicines }) => {
  const [prescription, setPrescription] = useState({
    patientName: '',
    patientId: '',
    diagnosis: '',
    medicines: [],
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [stockStatus, setStockStatus] = useState(null);
  const [error, setError] = useState('');
  const [createdPrescriptions, setCreatedPrescriptions] = useState([]);

  const checkStockAvailability = (medicine) => {
    setStockStatus({
      available: medicine.quantity > 0,
      quantity: medicine.quantity,
      medicine: medicine.name
    });
  };

  const handleMedicineSearch = (e) => {
    setSearchTerm(e.target.value);
    setSelectedMedicine(null);
    setStockStatus(null);
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
    checkStockAvailability(medicine);
  };

  const addMedicineToPrescription = () => {
    if (selectedMedicine && stockStatus) {
      setPrescription(prev => ({
        ...prev,
        medicines: [...prev.medicines, {
          ...selectedMedicine,
          stockStatus: stockStatus,
          dosage: '',
          duration: ''
        }]
      }));
      setSelectedMedicine(null);
      setStockStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPrescription = {
        ...prescription,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
        status: 'Active'
      };
      
      setCreatedPrescriptions(prev => [newPrescription, ...prev]);
      setPrescription({
        patientName: '',
        patientId: '',
        diagnosis: '',
        medicines: [],
        notes: ''
      });
      setError('');
    } catch (error) {
      setError('Error creating prescription: ' + error.message);
    }
  };

  const formatPrice = (price) => {
    return `${window.getComputedStyle(document.documentElement).getPropertyValue('--currency-symbol')}${price}`;
  };

  useEffect(() => {
    // Add fade-in animation to new prescriptions
    const elements = document.querySelectorAll('.prescription-card');
    elements.forEach(el => el.classList.add('fade-in'));
  }, [createdPrescriptions]);

  return (
    <div className="container">
      <div className="card prescription-system">
        <h2 className="gradient-text">Doctor's Prescription System</h2>
        
        <div className="prescription-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Patient Name</label>
              <input
                type="text"
                className="form-input"
                value={prescription.patientName}
                onChange={(e) => setPrescription(prev => ({ ...prev, patientName: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Patient ID</label>
              <input
                type="text"
                className="form-input"
                value={prescription.patientId}
                onChange={(e) => setPrescription(prev => ({ ...prev, patientId: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Diagnosis</label>
              <textarea
                className="form-input"
                value={prescription.diagnosis}
                onChange={(e) => setPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                required
              />
            </div>

            <div className="card medicine-search">
              <h3>Add Medicine</h3>
              <div className="search-container">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={handleMedicineSearch}
                />
                <div className="search-icon">🔍</div>
              </div>
              
              <div className="search-results">
                {medicines
                  .filter(medicine => 
                    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(medicine => (
                    <div 
                      key={medicine.id} 
                      className="medicine-item"
                      onClick={() => handleMedicineSelect(medicine)}
                    >
                      <span className="medicine-name">{medicine.name}</span>
                      <span className="medicine-stock">Stock: {medicine.quantity}</span>
                      <span className="medicine-price">{formatPrice(medicine.price)}</span>
                    </div>
                  ))}
              </div>

              {stockStatus && (
                <div className={`stock-status ${stockStatus.available ? 'badge-success' : 'badge-danger'}`}>
                  <p>
                    {stockStatus.medicine}: {stockStatus.available ? 'In Stock' : 'Out of Stock'}
                    {stockStatus.available && ` (${stockStatus.quantity} units available)`}
                  </p>
                  <button 
                    type="button" 
                    className={`btn ${stockStatus.available ? 'btn-success' : 'btn-danger'}`}
                    onClick={addMedicineToPrescription}
                    disabled={!stockStatus.available}
                  >
                    Add to Prescription
                  </button>
                </div>
              )}
            </div>

            <div className="prescribed-medicines">
              <h3>Prescribed Medicines</h3>
              {prescription.medicines.map((medicine, index) => (
                <div key={index} className="card prescribed-medicine">
                  <p className="medicine-name">{medicine.name}</p>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Dosage"
                    value={medicine.dosage}
                    onChange={(e) => {
                      const updatedMedicines = [...prescription.medicines];
                      updatedMedicines[index].dosage = e.target.value;
                      setPrescription(prev => ({ ...prev, medicines: updatedMedicines }));
                    }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Duration"
                    value={medicine.duration}
                    onChange={(e) => {
                      const updatedMedicines = [...prescription.medicines];
                      updatedMedicines[index].duration = e.target.value;
                      setPrescription(prev => ({ ...prev, medicines: updatedMedicines }));
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      const updatedMedicines = prescription.medicines.filter((_, i) => i !== index);
                      setPrescription(prev => ({ ...prev, medicines: updatedMedicines }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea
                className="form-input"
                value={prescription.notes}
                onChange={(e) => setPrescription(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="btn btn-primary submit-button">
              Create Prescription
            </button>
          </form>
        </div>

        {/* Display Created Prescriptions */}
        {createdPrescriptions.length > 0 && (
          <div className="created-prescriptions">
            <h3>Created Prescriptions</h3>
            {createdPrescriptions.map((prescription) => (
              <div key={prescription.id} className="card prescription-card">
                <div className="prescription-header">
                  <h4>Prescription #{prescription.id}</h4>
                  <span className="prescription-date">{prescription.createdAt}</span>
                </div>
                
                <div className="prescription-details">
                  <div className="patient-info">
                    <p><strong>Patient Name:</strong> {prescription.patientName}</p>
                    <p><strong>Patient ID:</strong> {prescription.patientId}</p>
                    <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
                  </div>

                  <div className="card prescribed-medicines-list">
                    <h5>Prescribed Medicines</h5>
                    <ul>
                      {prescription.medicines.map((medicine, index) => (
                        <li key={index}>
                          <strong>{medicine.name}</strong>
                          <span>Dosage: {medicine.dosage}</span>
                          <span>Duration: {medicine.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {prescription.notes && (
                    <div className="card prescription-notes">
                      <h5>Additional Notes</h5>
                      <p>{prescription.notes}</p>
                    </div>
                  )}

                  <div className="prescription-status">
                    <span className={`badge badge-${prescription.status.toLowerCase()}`}>
                      {prescription.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionSystem; 