import React, { useState, useEffect } from 'react';
import { getAddresses, addAddress, updateAddress, deleteAddress } from './api';

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    fullName: '',
    phoneNumber: '',
    pinCode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    addressType: 'Home',
  });
  const [editIndex, setEditIndex] = useState(null);

  // Fetch addresses on component mount
  useEffect(() => {
    async function fetchAddresses() {
      try {
        const fetchedAddresses = await getAddresses();
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    }
    fetchAddresses();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add or update address
  const handleAddOrUpdateAddress = async () => {
    if (!validateAddress(currentAddress)) {
      alert('Please fill in all required fields');
      return;
    }

    if (editIndex !== null) {
      try {
        const updated = await updateAddress(addresses[editIndex]._id, currentAddress);
        const updatedAddresses = [...addresses];
        updatedAddresses[editIndex] = updated;
        setAddresses(updatedAddresses);
        setEditIndex(null);
      } catch (error) {
        console.error('Error updating address:', error);
      }
    } else {
      try {
        const newAddress = await addAddress(currentAddress);
        setAddresses((prev) => [...prev, newAddress]);
      } catch (error) {
        console.error('Error adding address:', error);
      }
    }

    resetForm();
  };

  // Delete an address
  const handleDeleteAddress = async (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this address?');
    if (confirmDelete) {
      try {
        await deleteAddress(addresses[index]._id);
        setAddresses((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  // Validate address fields
  const validateAddress = (address) => {
    return (
      address.fullName &&
      address.phoneNumber &&
      address.pinCode &&
      address.addressLine1 &&
      address.city &&
      address.state
    );
  };

  // Reset form to initial state
  const resetForm = () => {
    setCurrentAddress({
      fullName: '',
      phoneNumber: '',
      pinCode: '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      addressType: 'Home',
    });
    setEditIndex(null);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Address Management</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Form fields here */}
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleAddOrUpdateAddress}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editIndex !== null ? 'Update Address' : 'Add Address'}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Saved Addresses List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses saved yet</p>
        ) : (
          addresses.map((address, index) => (
            <div key={index} className="border p-4 rounded mb-4 flex justify-between items-start">
              <div>
                <h4 className="font-bold">{address.fullName}</h4>
                {/* Display address details */}
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => editAddress(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressManager;
