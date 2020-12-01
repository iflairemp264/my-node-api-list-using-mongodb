const db = require("../models");
const gallery = db.gallery
const fs = require('fs');
const path = require('path');


exports.createGallery = async (req, res, next) => {
    console.log("file", req.file);
    if (!req.file) {
        return res.status(500).send({
            message: 'please select file'
        });
    } else {
        req.body.imageUrl = 'http://localhost:8080/images/' + req.file.filename;
        await gallery.create(req.body, function (err, gallery) {
            if (err) {
                console.log("err gallery", err);
                return next(err);
            }
            res.json(gallery);
        });
    }

}
exports.getImg = async (req, res, next) => {
    gallery.find({}, (err, images) => {
        if (err) {
            res.send({
                message: 'Error to find File'
            });
            return;
        } else {
            res.send({
                total: images.length,
                images
            })
        }
    });
}

exports.getSingleImg = async (req, res) => {
    let imgId = req.params.id
    console.log('imgfindbyId', imgId);
    gallery.findById({
        _id: imgId
    }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'something is went wrong to find image'
            })
            return;
        } else {
            console.log("find image:", data);
            res.status(200).send({
                message: 'get image successfully!',
                data
            });
        }
    })
}
exports.deleteImg = async (req, res) => {
    let file = req.body.files
    console.log("fileee", req.file.filename);
    let imgId = req.params.id;
    await gallery.deleteOne({
        _id: imgId
    }, (err) => {
        if (err) {
            res.status(500).send({
                message: 'soemthing went wrong in delete Image, try again later'
            });
            return;
        } else {
            fs.unlink(path + req.file.filename, (err) => {
                if (err) {
                    res.send({
                        message: 'failed to delete local image. ' + err
                    })
                }
            })
            res.status(200).send({
                message: 'Image deleted successfully!'
            });
        }
    });
}