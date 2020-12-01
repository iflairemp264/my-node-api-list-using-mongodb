const mongoose = require('mongoose');

const Posts = mongoose.model(
    'Posts',
    new mongoose.Schema({
        title:String,
        author:String,
        description:String
    }));

module.exports = Posts;