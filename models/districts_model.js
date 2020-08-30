const mongoose = require('mongoose');

const distrctSchema = new mongoose.Schema({
    district : String
  
})

const district = mongoose.model('districts', distrctSchema);

module.exports = district;
