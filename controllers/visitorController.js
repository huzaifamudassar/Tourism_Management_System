const Visitor = require('../models/visitor');
const Review = require('../models/review');

// Create Visitor
const createVisitor = async (req, res) => {
    try {
        const { name, email, visitedAttractions } = req.body;
        const existingVisitor = await Visitor.findOne({ email });
        if (existingVisitor) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }
        const visitor = new Visitor({ name, email, visitedAttractions });
        await visitor.save();
        res.status(201).json({ message: 'Visitor registered successfully.', visitor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read All Visitors
const getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().populate('visitedAttractions');
        res.json(visitors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Visitor
const updateVisitor = async (req, res) => {
    try {
        const { name, email, visitedAttractions } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }
        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            { name, email, visitedAttractions },
            { new: true }
        );
        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found.' });
        }
        res.json({ message: 'Visitor updated successfully.', visitor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Visitor
const deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found.' });
        }
        res.json({ message: 'Visitor deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Visitor Activity
const getVisitorActivity = async (req, res) => {
    try {
        const visitors = await Visitor.find().lean();
        const activity = await Promise.all(
            visitors.map(async (v) => {
                const reviewsCount = await Review.countDocuments({ visitor: v._id });
                return { name: v.name, email: v.email, reviewedAttractions: reviewsCount };
            })
        );
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createVisitor,
    getAllVisitors,
    updateVisitor,
    deleteVisitor,
    getVisitorActivity,
};
