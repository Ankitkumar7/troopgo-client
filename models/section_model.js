const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    fileName: {
        type: String,
    },
    dateOfSubmission: {
        type: String,
    },
    letterNumber: {
        type: String
    },
    letterDate: {
        type: String
    },
    subject: {
        type: String
    },
    fileUrl: {
        type: String
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
    }
})

const section = mongoose.model('section', sectionSchema);

module.exports = section;
