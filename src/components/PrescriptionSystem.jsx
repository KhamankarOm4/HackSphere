import React, { useState } from 'react';
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

  return (
    <div className="prescription-system">
      <h2>Doctor's Prescription System</h2>
      
      <div className="prescription-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              value={prescription.patientName}
              onChange={(e) => setPrescription(prev => ({ ...prev, patientName: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Patient ID:</label>
            <input
              type="text"
              value={prescription.patientId}
              onChange={(e) => setPrescription(prev => ({ ...prev, patientId: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Diagnosis:</label>
            <textarea
              value={prescription.diagnosis}
              onChange={(e) => setPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
              required
            />
          </div>

          <div className="medicine-search">
            <h3>Add Medicine</h3>
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={handleMedicineSearch}
            />
            
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
                    {medicine.name}
                  </div>
                ))}
            </div>

            {stockStatus && (
              <div className={`stock-status ${stockStatus.available ? 'available' : 'unavailable'}`}>
                <p>
                  {stockStatus.medicine}: {stockStatus.available ? 'In Stock' : 'Out of Stock'}
                  {stockStatus.available && ` (${stockStatus.quantity} units available)`}
                </p>
                <button 
                  type="button" 
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
              <div key={index} className="prescribed-medicine">
                <p>{medicine.name}</p>
                <input
                  type="text"
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
            <label>Additional Notes:</label>
            <textarea
              value={prescription.notes}
              onChange={(e) => setPrescription(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="submit-button">
            Create Prescription
          </button>
        </form>
      </div>

      {/* Display Created Prescriptions */}
      {createdPrescriptions.length > 0 && (
        <div className="created-prescriptions">
          <h3>Created Prescriptions</h3>
          {createdPrescriptions.map((prescription) => (
            <div key={prescription.id} className="prescription-card">
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

                <div className="prescribed-medicines-list">
                  <h5>Prescribed Medicines:</h5>
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
                  <div className="prescription-notes">
                    <h5>Additional Notes:</h5>
                    <p>{prescription.notes}</p>
                  </div>
                )}

                <div className="prescription-status">
                  <span className={`status-badge ${prescription.status.toLowerCase()}`}>
                    {prescription.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionSystem; 