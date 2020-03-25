const mongoose = require('mongoose')

mongoose
    //.connect('mongodb+srv://s6004062630159:1100702741423@cluster0-b9bb5.azure.mongodb.net/cinema', { useNewUrlParser: true })
    .connect('mongodb+srv://s6004062630159:1100702741423@cluster0-mhjmz.azure.mongodb.net/cinema?', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db