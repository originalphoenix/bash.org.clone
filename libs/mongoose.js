var mongoose = require('mongoose'),
    config   = require('./config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('[connection error]: ', err.message);
});

db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var Quote = new Schema({
    date: { type: Date, default: Date.now, required: true },
    content: { type: String, required: true },
    power: { type: Number, default: 0, required: true }
});

var QuoteModel = mongoose.model('Quote', Quote);

module.exports.QuoteModel = QuoteModel;