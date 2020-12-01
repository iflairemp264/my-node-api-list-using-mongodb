const postcontroller = require('../controllers/posts.controller');

module.exports = function(app){

    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    });
    app.post('/api/post/new',postcontroller.newPost);
    app.get('/api/post/getpost',postcontroller.getPost);
    app.get('/api/post/getpost/:id',postcontroller.getSinglePost);
    app.put('/api/post/update/:id',postcontroller.updatePost);
    app.delete('/api/post/delete/:id',postcontroller.deleteSinglePost);
    app.delete('/api/post/deleteall',postcontroller.deleteAllPost);
}