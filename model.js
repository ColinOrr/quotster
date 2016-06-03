const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    quote  : String,
    author : String,
    date   : { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', quoteSchema);
