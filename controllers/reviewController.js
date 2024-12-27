const Review = require('../models/review');
const Attraction = require('../models/attraction');
const Visitor = require('../models/visitor');

// Create Review
const createReview = async (req, res) => {
    try {
        const { attraction, visitor, score, comment } = req.body;

        if (score < 1 || score > 5) {
            return res.status(400).json({ error: 'Score must be between 1 and 5.' });
        }

        const visitorData = await Visitor.findById(visitor).populate('visitedAttractions');
        if (!visitorData || !visitorData.visitedAttractions.some((attr) => attr.equals(attraction))) {
            return res.status(400).json({ error: 'Visitor has not visited this attraction.' });
        }

        const existingReview = await Review.findOne({ attraction, visitor });
        if (existingReview) {
            return res.status(400).json({ error: 'Visitor has already reviewed this attraction.' });
        }

        const review = new Review({ attraction, visitor, score, comment });
        await review.save();

        const reviews = await Review.find({ attraction });
        const avgRating = reviews.reduce((acc, r) => acc + r.score, 0) / reviews.length;
        await Attraction.findByIdAndUpdate(attraction, { rating: avgRating });

        res.status(201).json({ message: 'Review added successfully.', review });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read All Reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('attraction visitor');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found.' });
        }

        const reviews = await Review.find({ attraction: review.attraction });
        const avgRating = reviews.length
            ? reviews.reduce((acc, r) => acc + r.score, 0) / reviews.length
            : 0;
        await Attraction.findByIdAndUpdate(review.attraction, { rating: avgRating });

        res.json({ message: 'Review deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    deleteReview,
};
