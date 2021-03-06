/**
 * Created by ericd34n on 6/24/17.
 * Hacked by parkerduckworth on 12/5/17
 */

//const http = require('http');

var express = require('express');
var app = express();
const port = 8080;

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobarchive');

var mongojs = require('mongojs');
var db = mongojs('LOL');


var PostSchema = mongoose.Schema({
    site: String,
    volume: Number,
    stroke: Number,
    speed: Number,
    body: String,
    flagged: Boolean,
    posted: {type: Date, default: Date.now}
}, {collection: 'post'});


var SiteSchema = mongoose.Schema({
    site_name: String,
    created_on: {type: Date, default: Date.now},
    product: String,
    volume_current: Number,
    location: String,
    rate: String,
    capacity: Number,
    isInService: {type: Boolean, default: true}
}, {collection: 'site'});

// Passing Post Schema as part of the construction of PostModel
var PostModel = mongoose.model("PostModel", PostSchema);

var SiteModel = mongoose.model("SiteModel", SiteSchema);

app.use(express.static(__dirname + '/public'));
app.use(express.static('work'));
app.use(express.static('sites'));
app.use(express.static('orders'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* Job Postings */ 
app.post("/api/job", createPost);
app.get("/api/job", getAllPosts);
app.get("/api/job/:id", getPostById);
app.put("/api/job/:id", updatePost);
app.delete("/api/job/:id", deletePost);

/* Interface to add and update 'sites' */ 
app.post("/api/site", createSite);
app.get("/api/site", getAllSites);
app.get("/api/site/:id", getSiteById);
app.delete("/api/site/:id", deleteSite);

app.get("/api/ml", getMlSites);

function updatePost(req, res){
    var postId = req.params.id;
    var post = req.body;
    PostModel
        .update({_id: postId},{
            site: post.site,
            body: post.body,
        })
        .then(function(status){
            res.sendStatus(200);
        },
        function(err){
            res.sendStatus(400);
        });
}

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

function getAllSites(req, res){
   SiteModel
       .find()
       .then(
           function(sites){
               res.json(sites);
           },
           function(err){
               res.sendStatus(400);
           }
       );
}

/*=====================================
    Okay the CLOUD db is up and running
    Hit a wall with controllers...
    Diving down the rabbit hole. 
    will be back soon. 
 ======================================*/
function getMlSites(req, res){
    db.sites.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
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

function createSite(req, res){
    var site = req.body;
    SiteModel
        .create(site)
        .then(
            function(siteObj){
                res.json(site);
            },
            function(error){
                res.sendStatus(400);
            }
        );
}

function getSiteById(req, res){
    var siteId = req.params.id;
    SiteModel
        .findById(siteId)
        .then(
            function(site){
                res.json(site);
            },
            function(err){
                res.sendStatus(400);
            }
        );
}

function deleteSite(req, res){
    var siteId = req.params.id;
    SiteModel
        .remove({_id: siteId})
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(){
                res.sendStatus(400);
            }
        );
}

app.listen(port, function(){
    console.log('\n\nServer Started On Port: ' + port + '\n\n');
});
