/**
 * Created by ericd34n on 6/24/17.
 */

let express = require('express');
let app = express();
const port = 8080;

let bodyParser = require('body-parser');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobarchive');

// Figure out how to just include these models from
// model files.
const PostSchema = mongoose.Schema({
    site: String,
    volume: Number,
    stroke: Number,
    speed: Number,
    body: String,
    flagged: Boolean,
    posted: {type: Date, default: Date.now}
}, {collection: 'post'});


const SiteSchema = mongoose.Schema({
    site_name: String,
    created_on: {type: Date, default: Date.now},
    product: String,
    volume_current: Number,
    location: String,
    rate: String,
    capacity: Number,
    isInService: {type: Boolean, default: true}
}, {collection: 'site'});


const DeliverySchema = mongoose.Schema({
    site_name: String,
    created_on: {type: Date, default: Date.now},
    product: String,
    location: String,
    start_volume: Number,
    end_volume: Number,
    delivered_quantity: Number
}, {collection: 'deliveries'});

// Passing Post Schema as part of the construction of PostModel
const PostModel = mongoose.model("PostModel", PostSchema);

const SiteModel = mongoose.model("SiteModel", SiteSchema);

const DeliveryModel = mongoose.model("DeliveryModel", DeliverySchema);

app.use(express.static(__dirname + '/public'));

// Static Paths
app.use(express.static('work'));
app.use(express.static('sites'));
app.use(express.static('orders'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Jobs
app.post("/api/job", createPost);

app.get("/api/job", getAllPosts);
app.get("/api/job/:id", getPostById);

app.put("/api/job/:id", updatePost);
app.delete("/api/job/:id", deletePost);


// Sites
app.post("/api/site", createSite);
app.get("/api/site", getAllSites);
app.get("/api/site/:id", getSiteById);
app.delete("/api/site/:id", deleteSite);

// Deliveries
app.post("/api/site/delivery", deliver);
app.get("/api/sites/deliveries", getAllDeliveries);
//app.get("/api/site/delivery/:id", getDeliveryById);
app.delete("/api/site/delivery/:id", deleteDelivery);


app.get("/api/ml", getMlSites);


function deliver(request, response){
    const delivery = request.body;
    DeliveryModel
        .create(delivery)
        .then(
            function (postObj) {
                response.json(delivery);
            },
            function(error){
                response.sendStatus(400);
            }
        );
}


function getAllDeliveries(req, res){
    DeliveryModel
        .find()
        .then(
            function(delivery){
                res.json(delivery);
            },
            function(err){
                res.sendStatus(400);
            }
        );
}

function deleteDelivery(req, res){
    const deliveryId = req.params.id;
    DeliveryModel
        .remove({_id: deliveryId})
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(){
                res.sendStatus(400);
            }
        );
}

function updatePost(req, res){
    const postId = req.params.id;
    const post = req.body;
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
    const postId = req.params.id;
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
    Okay the Mlab db is up and running
    now you should go fix some stuff
    learn some stuff...

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
    const postId = req.params.id;
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
    const post = request.body;
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
    const site = req.body;
    console.log(site);
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
    const siteId = req.params.id;
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
    const siteId = req.params.id;
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
