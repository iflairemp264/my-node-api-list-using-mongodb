const mongoose = require('mongoose');

const Gallery = mongoose.model(
    'Gallery',
    new mongoose.Schema({
        imageUrl: String,
        imageTitle: String,
        imageDesc: String,
        uploaded: {
            type: Date,
            default: Date.now
        },
       
    })
)
module.exports = Gallery