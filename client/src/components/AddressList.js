import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  const fetchAddresses = async () => {
    const res = await axios.get('http://localhost:5000/api/addresses');
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/addresses/${id}`);
    fetchAddresses();
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
  };

  return (
    <div>
      <h2>Your Addresses</h2>
      <AddressForm fetchAddresses={fetchAddresses} editingAddress={editingAddress} setEditingAddress={setEditingAddress} />
      <div>
        {addresses.map(address => (
          <AddressCard key={address._id} address={address} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default AddressList;
