import React, { useState } from 'react';
import './App.css';
import ChatBot from './components/ChatBot';
import AboutUs from './components/AboutUs';
import SupplierManagement from './components/SupplierManagement';
import DemandForecast from './components/DemandForecast';
import PrescriptionSystem from './components/PrescriptionSystem';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      quantity: 500,
      price: 5.99,
      expiryDate: '2024-12-31',
      manufacturer: 'PharmaCo',
      category: 'Pain Relief',
    },
    {
      id: 2,
      name: 'Amoxicillin',
      quantity: 80,
      price: 10.99,
      expiryDate: '2024-06-30',
      manufacturer: 'MediCare',
      category: 'Antibiotics',
    },
    {
      id: 3,
      name: 'Ibuprofen',
      quantity: 350,
      price: 7.99,
      expiryDate: '2024-09-15',
      manufacturer: 'HealthPharm',
      category: 'Pain Relief',
    },
    {
      id: 4,
      name: 'Omeprazole',
      quantity: 200,
      price: 8.99,
      expiryDate: '2024-11-20',
      manufacturer: 'PharmaLife',
      category: 'Antacid',
    },
    {
      id: 5,
      name: 'Azithromycin',
      quantity: 75,
      price: 12.99,
      expiryDate: '2024-02-28',
      manufacturer: 'MediCare',
      category: 'Antibiotics',
    },
    {
      id: 6,
      name: 'Cetirizine',
      quantity: 450,
      price: 6.99,
      expiryDate: '2024-10-15',
      manufacturer: 'AllerCure',
      category: 'Antihistamine',
    },
    {
      id: 7,
      name: 'Metformin',
      quantity: 90,
      price: 9.99,
      expiryDate: '2024-07-31',
      manufacturer: 'DiaCare',
      category: 'Diabetes',
    },
    {
      id: 8,
      name: 'Aspirin',
      quantity: 600,
      price: 4.99,
      expiryDate: '2024-01-31',
      manufacturer: 'HeartWell',
      category: 'Pain Relief',
    },
    {
      id: 9,
      name: 'Fluoxetine',
      quantity: 120,
      price: 15.99,
      expiryDate: '2024-08-25',
      manufacturer: 'MindCare',
      category: 'Antidepressant',
    },
    {
      id: 10,
      name: 'Loratadine',
      quantity: 95,
      price: 7.99,
      expiryDate: '2024-04-30',
      manufacturer: 'AllerCure',
      category: 'Antihistamine',
    },
    {
      id: 11,
      name: 'Pantoprazole',
      quantity: 2800,
      price: 11.99,
      expiryDate: '2025-06-30',
      manufacturer: 'GastroHealth',
      category: 'Antacid',
    },
    {
      id: 12,
      name: 'Montelukast',
      quantity: 1500,
      price: 18.99,
      expiryDate: '2025-03-15',
      manufacturer: 'RespiCare',
      category: 'Antihistamine',
    },
    {
      id: 13,
      name: 'Sertraline',
      quantity: 2200,
      price: 14.99,
      expiryDate: '2025-08-20',
      manufacturer: 'MindCare',
      category: 'Antidepressant',
    },
    {
      id: 14,
      name: 'Escitalopram',
      quantity: 1800,
      price: 16.99,
      expiryDate: '2025-05-25',
      manufacturer: 'NeuroPharma',
      category: 'Antidepressant',
    },
    {
      id: 15,
      name: 'Rosuvastatin',
      quantity: 2500,
      price: 22.99,
      expiryDate: '2025-07-15',
      manufacturer: 'CardioMed',
      category: 'Cholesterol',
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    expiryDate: '',
    manufacturer: '',
    category: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingMedicine, setEditingMedicine] = useState(null);

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (editingMedicine) {
      setMedicines(medicines.map(med => 
        med.id === editingMedicine.id ? { ...formData, id: med.id } : med
      ));
      setEditingMedicine(null);
    } else {
      const newMedicine = {
        id: medicines.length + 1,
        ...formData
      };
      setMedicines([...medicines, newMedicine]);
    }
    setFormData({
      name: '',
      quantity: '',
      price: '',
      expiryDate: '',
      manufacturer: '',
      category: ''
    });
    setActiveTab('inventory');
  };

  const handleDelete = (id) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData(medicine);
    setActiveTab('add');
  };

  // Add this inside the inventory section, before the table
  const inventorySection = (
    <div className="inventory-controls">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Antiviral">Antiviral</option>
          <option value="Antihistamine">Antihistamine</option>
          <option value="Antacid">Antacid</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Antidepressant">Antidepressant</option>
          <option value="Vaccines">Vaccines</option>
        </select>
      </div>
      <div className="sort-controls">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Name</option>
          <option value="quantity">Quantity</option>
          <option value="expiryDate">Expiry Date</option>
        </select>
        <button
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="sort-order-btn"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );

  // Update the form title and button text based on editing state
  const formTitle = editingMedicine ? 'Edit Medicine' : 'Add New Medicine';
  const submitButtonText = editingMedicine ? 'Update Medicine' : 'Add Medicine';

  // Add these helper functions
  const isLowStock = (quantity) => quantity < 100;
  const isNearExpiry = (date) => {
    const expiryDate = new Date(date);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow;
  };

  // Add a new stat card for near expiry items
  const nearExpiryCount = medicines.filter(m => isNearExpiry(m.expiryDate)).length;

  // Add total value calculation
  const calculateTotalValue = () => {
    return medicines.reduce((total, med) => total + (med.price * med.quantity), 0);
  };

  // Add these helper functions
  const getExpiryStatus = (date) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const monthsLeft = (expiryDate - today) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsLeft <= 0) return 'expired';
    if (monthsLeft <= 3) return 'near-expiry';
    if (monthsLeft <= 6) return 'expiring-soon';
    return 'good';
  };

  // Add expiry warnings component
  const ExpiryWarnings = () => {
    const expiredMeds = medicines.filter(m => getExpiryStatus(m.expiryDate) === 'expired');
    const nearExpiryMeds = medicines.filter(m => getExpiryStatus(m.expiryDate) === 'near-expiry');
    
    if (expiredMeds.length === 0 && nearExpiryMeds.length === 0) return null;
    
    return (
      <div className="expiry-warnings">
        {expiredMeds.length > 0 && (
          <div className="warning expired">
            <h4>⚠️ Expired Medicines</h4>
            <ul>
              {expiredMeds.map(med => (
                <li key={med.id}>{med.name} - Expired on {med.expiryDate}</li>
              ))}
            </ul>
          </div>
        )}
        {nearExpiryMeds.length > 0 && (
          <div className="warning near-expiry">
            <h4>⚠️ Near Expiry</h4>
            <ul>
              {nearExpiryMeds.map(med => (
                <li key={med.id}>{med.name} - Expires on {med.expiryDate}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app" style={{
      backgroundImage: `linear-gradient(
        rgba(79, 70, 229, 0.8),
        rgba(14, 165, 233, 0.8)
      ), url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80')`
    }}>
      <nav className="navbar glass-effect">
        <h1>Med Inventory</h1>
        <div className="nav-links">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'inventory' ? 'active' : ''} 
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button 
            className={activeTab === 'add' ? 'active' : ''} 
            onClick={() => setActiveTab('add')}
          >
            Add Medicine
          </button>
          <button 
            className={activeTab === 'about' ? 'active' : ''} 
            onClick={() => setActiveTab('about')}
          >
            About Us
          </button>
          <button 
            className={activeTab === 'suppliers' ? 'active' : ''} 
            onClick={() => setActiveTab('suppliers')}
          >
            Suppliers
          </button>
          <button 
            className={activeTab === 'prescription' ? 'active' : ''} 
            onClick={() => setActiveTab('prescription')}
          >
            Prescription System
          </button>
        </div>
      </nav>

      <main className="content glass-effect">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <ExpiryWarnings />
            <div className="stats-grid">
              <div className="stat-card glass-effect">
                <div className="stat-icon">📦</div>
                <div className="stat-content">
                  <h3>Total Medicines</h3>
                  <p>{medicines.length}</p>
                </div>
              </div>
              <div className="stat-card glass-effect">
                <div className="stat-icon">⚠️</div>
                <div className="stat-content">
                  <h3>Low Stock Items</h3>
                  <p className="low-stock">
                    {medicines.filter(m => isLowStock(m.quantity)).length}
                  </p>
                </div>
              </div>
              <div className="stat-card glass-effect">
                <div className="stat-icon">⏰</div>
                <div className="stat-content">
                  <h3>Near Expiry</h3>
                  <p className="near-expiry">{nearExpiryCount}</p>
                </div>
              </div>
              <div className="stat-card glass-effect">
                <div className="stat-icon">🏷️</div>
                <div className="stat-content">
                  <h3>Categories</h3>
                  <p>{new Set(medicines.map(m => m.category)).size}</p>
                </div>
              </div>
              <div className="stat-card glass-effect">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>Total Value</h3>
                  <p className="value">
                    ${calculateTotalValue().toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Add Low Stock Section */}
            <div className="dashboard-alerts">
              <div className="low-stock-section">
                <h3>Low Stock Medicines</h3>
                <div className="alert-cards">
                  {medicines
                    .filter(med => med.quantity < 100)
                    .map(med => (
                      <div key={med.id} className="alert-card low-stock-card">
                        <div className="alert-header">
                          <h4>{med.name}</h4>
                          <span className="quantity-badge">
                            {med.quantity} left
                          </span>
                        </div>
                        <div className="alert-details">
                          <p>Category: {med.category}</p>
                          <p>Price: ${med.price}</p>
                          <p 
                            className="reorder-text"
                            onClick={() => setActiveTab('suppliers')}
                            style={{ cursor: 'pointer' }}
                          >
                            Reorder Recommended
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Add Expired Medicines Section */}
            <div className="dashboard-alerts">
              <div className="expired-section">
                <h3>Expired/Expiring Medicines</h3>
                <div className="expired-cards-scroll">
                  {medicines
                    .filter(med => isNearExpiry(med.expiryDate))
                    .map(med => (
                      <div key={med.id} className="alert-card expired-card">
                        <div className="alert-header">
                          <h4>{med.name}</h4>
                          <span className="expiry-badge">
                            {med.expiryDate}
                          </span>
                        </div>
                        <div className="alert-details">
                          <p>Category: {med.category}</p>
                          <p>Quantity: {med.quantity}</p>
                          <p>Manufacturer: {med.manufacturer}</p>
                          <p className="expired-text">
                            {new Date(med.expiryDate) < new Date() ? 'Expired' : 'Expiring Soon'}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Add Demand Forecast Section */}
            <DemandForecast medicines={medicines} />
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="inventory">
            <h2>Medicine Inventory</h2>
            {inventorySection}
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Expiry Date</th>
                  <th>Manufacturer</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines
                  .filter(medicine => 
                    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (filterCategory === '' || medicine.category === filterCategory)
                  )
                  .sort((a, b) => {
                    const order = sortOrder === 'asc' ? 1 : -1;
                    return a[sortBy] > b[sortBy] ? order : -order;
                  })
                  .map(medicine => (
                    <tr key={medicine.id}>
                      <td>{medicine.name}</td>
                      <td className={isLowStock(medicine.quantity) ? 'low-stock' : ''}>
                        {medicine.quantity}
                        {isLowStock(medicine.quantity) && ' (Low Stock)'}
                      </td>
                      <td className={isNearExpiry(medicine.expiryDate) ? 'near-expiry' : ''}>
                        {medicine.expiryDate}
                        {isNearExpiry(medicine.expiryDate) && ' (Near Expiry)'}
                      </td>
                      <td>{medicine.manufacturer}</td>
                      <td>{medicine.category}</td>
                      <td className="action-buttons">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(medicine)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(medicine.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="add-medicine">
            <h2>{formTitle}</h2>
            <form onSubmit={handleAddMedicine}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="required-field">Medicine Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Enter medicine name"
                  />
                </div>
                <div className="form-group">
                  <label className="required-field">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    required
                    min="0"
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="form-group">
                  <label className="required-field">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    placeholder="Enter price"
                  />
                </div>
                <div className="form-group">
                  <label className="required-field">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label className="required-field">Manufacturer</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                    required
                    placeholder="Enter manufacturer name"
                  />
                </div>
                <div className="form-group">
                  <label className="required-field">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Antiviral">Antiviral</option>
                    <option value="Antihistamine">Antihistamine</option>
                    <option value="Antacid">Antacid</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Antidepressant">Antidepressant</option>
                    <option value="Vaccines">Vaccines</option>
                  </select>
                </div>
              </div>
              <div className="submit-container">
                <button type="submit" className="submit-btn">
                  {submitButtonText}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'about' && <AboutUs />}

        {activeTab === 'suppliers' && (
          <SupplierManagement 
            medicines={medicines} 
            onUpdateMedicine={(id, updatedMedicine) => {
              setMedicines(medicines.map(med => 
                med.id === id ? updatedMedicine : med
              ));
            }} 
          />
        )}

        {activeTab === 'prescription' && <PrescriptionSystem medicines={medicines} />}
      </main>
      <ChatBot medicines={medicines} />
    </div>
  );
}

export default App;