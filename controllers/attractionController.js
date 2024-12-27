const Attraction = require('../models/attraction');

// Create Attraction
const createAttraction = async (req, res) => {
    try {
        const { name, location, entryFee } = req.body;
        if (entryFee < 0) {
            return res.status(400).json({ error: 'Entry fee cannot be negative.' });
        }
        const attraction = new Attraction({ name, location, entryFee });
        await attraction.save();
        res.status(201).json({ message: 'Attraction added successfully.', attraction });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read All Attractions
const getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.json(attractions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Attraction
const updateAttraction = async (req, res) => {
    try {
        const { name, location, entryFee } = req.body;
        if (entryFee < 0) {
            return res.status(400).json({ error: 'Entry fee cannot be negative.' });
        }
        const attraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            { name, location, entryFee },
            { new: true }
        );
        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found.' });
        }
        res.json({ message: 'Attraction updated successfully.', attraction });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Attraction
const deleteAttraction = async (req, res) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found.' });
        }
        res.json({ message: 'Attraction deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Top Rated Attractions
const getTopRatedAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find().sort({ rating: -1 }).limit(5);
        res.json(attractions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createAttraction,
    getAllAttractions,
    updateAttraction,
    deleteAttraction,
    getTopRatedAttractions,
};
