const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    dateOfSubmission: {
        type: String,
    },
    year: {
        type: String,
    },
    month: {
        type: String
    },
    fileUrl: {
        type: Array
    },
    type: {
        type: String
    },
    createdBy: {
        type: String
    },
    original_filename: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: new Date().toISOString()
    },
    reason: {
        type: String,
    }, 
    reviewComment: {
        type: String
    },
    reviewBy: {
        type: String
    }
})

const section = mongoose.model('section', sectionSchema);

module.exports = section;
