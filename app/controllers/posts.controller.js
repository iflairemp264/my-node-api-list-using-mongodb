const db = require('../models');
const posts = db.posts;

exports.newPost = async (req, res, next) => {
    await new posts(req.body).save((err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Something went wrong , please try agian later'
            });
            return;
        } else {
            res.status(200).send({
                message: 'post created successfully!',
                data
            })
        }
    });
};

exports.getPost = async (req, res) => {
    await posts.find((err, data) => {
        if (err) {
            res.status(500).json({
                message: 'somethig went wrong to get all post. try again later'
            })
            return;
        } else if (!data.length) {
            res.status(200).send({
                message: "No post found, please add post"
            });
            return;
        } else {
            console.log("findAllData:", data);
            res.status(200).send(data);
        }
    })
}

exports.getSinglePost = async (req, res) => {
    let postId = req.params.id;
    await posts.findById({
        _id: postId
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Something went wrong to find post, please try again later.'
            });
            return;
        } else {
            console.log("data");
            res.status(200).send({
                message: 'get single post',
                data
            });
        }
    })
}
exports.updatePost = async (req, res) => {
    let postId = req.params.id;
    await posts.findByIdAndUpdate({
        _id: postId
    }, {
        $set: req.body
    }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'something is went wrong to update data'
            })
            return;
        } else {
            console.log("update data:", data);
            res.status(200).send({
                message: 'post update successfully',
                data
            });
        }
    })
}
exports.deleteSinglePost = async (req, res) => {
    let postId = req.params.id;
    await posts.deleteOne({
        _id: postId
    }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'soemthing went wrong in delete post, try again later'
            });
            return;
        } else {
            res.status(200).send({
                message: 'post deleted successfully!'
            });
        }
    });
}
exports.deleteAllPost = async (req, res) => {
    await posts.remove((err, data) => {
        if (err) {
            res.status(500).send({
                message: 'something went wrong to remove all records!'
            });
            return;
        } else {
            res.status(200).send({
                message: 'Deleted all record successfully!'
            });
        }
    })
}