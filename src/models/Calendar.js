const mongoose = require('mongoose')

const CalendarSchema = new mongoose.Schema({
    task: { type: String, required: true },

    start: Date,
    end: Date,
});

module.exports = mongoose.model('Calendar', CalendarSchema);