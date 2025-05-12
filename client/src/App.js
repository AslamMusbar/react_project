import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {
  FaUser, FaMapMarkerAlt, FaCity, FaTrashAlt, FaEdit,
  FaFlag, FaPlus, FaEllipsisV, FaBars
} from 'react-icons/fa';

function App() {
  const [addressData, setAddressData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [showNav, setShowNav] = useState(true);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await axios.put(`http://localhost:5000/api/addresses/${editId}`, addressData);
        setAddresses(addresses.map(addr => addr._id === editId ? response.data : addr));
        setEditId(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/addresses', addressData);
        setAddresses([...addresses, response.data]);
      }
      setAddressData({ name: '', street: '', city: '', state: '', zip: '', country: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const handleEdit = (address) => {
    setEditId(address._id);
    setAddressData(address);
    setShowForm(true);
    setDropdownOpenId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`);
      setAddresses(addresses.filter(addr => addr._id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div className="app-container">
      {/* Burger Button */}
      <button className="burger-btn" onClick={() => setShowNav(!showNav)}>
        <FaBars />
      </button>

      {/* Left Navbar */}
      <div className={`navbar ${showNav ? '' : 'hidden'}`}>
        <h2 className="down">Address Manager</h2>
      </div>

      {/* Right Content */}
      <div className="content">
      <h1 className="topic">ADDRESS MANAGEMENT BY ASLAM MUSBAR</h1>
        <div className="header">
          <button
            className="add-btn"
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setAddressData({ name: '', street: '', city: '', state: '', zip: '', country: '' });
            }}
          >
            <FaPlus /> Add New Address
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="address-form">
            <input type="text" name="name" value={addressData.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="street" value={addressData.street} onChange={handleChange} placeholder="Street" required />
            <input type="text" name="city" value={addressData.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="state" value={addressData.state} onChange={handleChange} placeholder="State" required />
            <input type="text" name="zip" value={addressData.zip} onChange={handleChange} placeholder="ZIP Code" required />
            <input type="text" name="country" value={addressData.country} onChange={handleChange} placeholder="Country" required />
            <button type="submit">{editId ? 'Update Address' : 'Add Address'}</button>
          </form>
        )}

        {/* Address List */}
        <div className="address-list">
          {addresses.map((address) => (
            <div className="address-card" key={address._id}>
              <div className="card-header">
                <h3><FaUser /> {address.name}</h3>
                <button className="dots-btn" onClick={() => setDropdownOpenId(dropdownOpenId === address._id ? null : address._id)}>
                  <FaEllipsisV />
                </button>
                {dropdownOpenId === address._id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEdit(address)}><FaEdit /> Edit</button>
                    <button onClick={() => handleDelete(address._id)}><FaTrashAlt /> Delete</button>
                  </div>
                )}
              </div>
              <p><FaMapMarkerAlt /> {address.street}, {address.city}</p>
              <p><FaCity /> {address.state} - {address.zip}</p>
              <p><FaFlag /> {address.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
