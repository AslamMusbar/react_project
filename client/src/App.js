import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State to manage form data
  const [addressData, setAddressData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  // State to manage all addresses (fetched from the backend)
  const [addresses, setAddresses] = useState([]);

  // Fetch all addresses from the backend
  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/addresses');
      setAddresses(response.data); // Update the state with the list of addresses
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  // Call fetchAddresses when the component mounts
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle change in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post('http://localhost:5000/api/addresses', addressData);
      console.log('Address added:', response.data);

      // After adding the new address, update the list of addresses
      setAddresses([...addresses, response.data]);

      // Clear the form fields after submission
      setAddressData({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      });
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  return (
    <div className="App">
      <h1>Add New Address</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={addressData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={addressData.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={addressData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Zip:</label>
          <input
            type="text"
            name="zip"
            value={addressData.zip}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={addressData.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Address</button>
      </form>

      <h2>All Addresses</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address._id}>
            <strong>{address.name}</strong>
            <p>{address.street}, {address.city}, {address.state} - {address.zip}</p>
            <p>{address.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
