import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressForm = ({ fetchAddresses, editingAddress, setEditingAddress }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    city: '',
    state: '',
    street: '',
  });

  useEffect(() => {
    if (editingAddress) {
      setFormData(editingAddress);
    }
  }, [editingAddress]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingAddress) {
      await axios.put(`http://localhost:5000/api/addresses/${editingAddress._id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/addresses', formData);
    }
    setFormData({ name: '', phone: '', pincode: '', city: '', state: '', street: '' });
    setEditingAddress(null);
    fetchAddresses();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
      <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
      <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
      <input name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required />
      <button type="submit">{editingAddress ? 'Update' : 'Add'} Address</button>
    </form>
  );
};

export default AddressForm;
