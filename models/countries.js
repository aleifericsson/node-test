const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const country_schema = new Schema({
    name: {type: String, required:true},
    flag_cols: [{type: String}],
    rating: {type: Number},
    visited: {type:Boolean},
}, {timestamps: true});

const Country = mongoose.model('Country', country_schema)

module.exports = Country;