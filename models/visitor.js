const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Email format is invalid.'] 
    },
    visitedAttractions: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Attraction' }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
