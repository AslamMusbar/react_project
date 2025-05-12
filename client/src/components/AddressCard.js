import React from 'react';

const AddressCard = ({ address, onDelete, onEdit }) => {
  return (
    <div style={{ border: '1px solid gray', padding: '1rem', margin: '1rem 0' }}>
      <p><strong>{address.name}</strong></p>
      <p>{address.street}, {address.city}, {address.state} - {address.pincode}</p>
      <p>Phone: {address.phone}</p>
      <button onClick={() => onEdit(address)}>Edit</button>
      <button onClick={() => onDelete(address._id)}>Delete</button>
    </div>
  );
};

export default AddressCard;
