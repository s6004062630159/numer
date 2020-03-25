
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        fx: { type: String, required: true },
        xr: { type: String, required: true },
        xl: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)