const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

// Get all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    console.error('Error fetching addresses:', err);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

// Add a new address
router.post('/', async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const saved = await newAddress.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error adding new address:', err);
    res.status(400).json({ error: 'Failed to add address' });
  }
});

// Update an address
router.put('/:id', async (req, res) => {
  try {
    const updated = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating address:', err);
    res.status(400).json({ error: 'Failed to update address' });
  }
});

// Delete an address
router.delete('/:id', async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted' });
  } catch (err) {
    console.error('Error deleting address:', err);
    res.status(400).json({ error: 'Failed to delete address' });
  }
});

module.exports = router;
