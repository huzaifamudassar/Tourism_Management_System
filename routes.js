const express = require('express');
const router = express.Router();

const {
    createAttraction,
    getAllAttractions,
    updateAttraction,
    deleteAttraction,
    getTopRatedAttractions,
} = require('./controllers/attractionController');

const {
    createVisitor,
    getAllVisitors,
    updateVisitor,
    deleteVisitor,
    getVisitorActivity,
} = require('./controllers/visitorController');

const {
    createReview,
    getAllReviews,
    deleteReview,
} = require('./controllers/reviewController');

// Attractions Routes
router.post('/attractions', createAttraction);
router.get('/attractions', getAllAttractions);
router.put('/attractions/:id', updateAttraction);
router.delete('/attractions/:id', deleteAttraction);
router.get('/attraction/top-rated', getTopRatedAttractions);

// Visitors Routes
router.post('/visitors', createVisitor);
router.get('/visitors', getAllVisitors);
router.put('/visitors/:id', updateVisitor);
router.delete('/visitors/:id', deleteVisitor);
router.get('/visitor/activity', getVisitorActivity);

// Reviews Routes
router.post('/reviews', createReview);
router.get('/reviews', getAllReviews);
router.delete('/reviews/:id', deleteReview);

module.exports = router;
