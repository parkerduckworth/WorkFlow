/**
 * Created by ericd34n on 6/24/17.
 */

var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobarchive');

var PostSchema = mongoose.Schema({
    site: String,
    volume: Number,
    stroke: Number,
    speed: Number,
    body: String,
    flagged: Boolean,
    posted: {type: Date, default: Date.now}
}, {collection: 'post'});

// Passing Post Schema as part of the construction of PostModel
var PostModel = mongoose.model("PostModel", PostSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post("/api/job", createPost);
app.get("/api/job", getAllPosts);
app.get("/api/job/:id", getPostById);

app.delete("/api/job/:id", deletePost);

function deletePost(req, res){
    var postId = req.params.id;
    PostModel
        .remove({_id: postId})
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(){
                res.sendStatus(400);
            }
        );
}

function getAllPosts(req, res){
    PostModel
        .find()
        .then(
            function(posts){
                res.json(posts);
            },
            function(err){
                res.sendStatus(400)
            }
        );
}

function getPostById(req, res){
    var postId = req.params.id;
    PostModel
        .findById(postId)
        .then(
            function(post){
                res.json(post);
            },
            function(err){
                res.sendStatus(400);
            }
        );
}

function createPost(request, response){
    var post = request.body;
    PostModel
        .create(post)
        .then(
            function (postObj) {
                response.json(post);
            },
            function(error){
                response.sendStatus(400);
            }
        );
}

app.listen(port, function(){
    console.log('\n\nServer Started On Port: ' + port + '\n\n');
});
