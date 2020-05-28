var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
const ask = require('./storeViewModel')
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@tinsoft@');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var feedsSchema = new mongoose.Schema({

    content:String,
    content_type:Number,
    images:[{url:String}],
    videos: [{
        url: String
    }],
    comments:[{userid:String,comment:String,created:String}],
    likes: [{
        userid: String
    }],
    storeid: ObjectId,
    dateadded: String
    });

var  Todo = mongoose.model('Feed',feedsSchema);

module.exports = function (app) {
    //show all products
    var wale= "locker";


    app.get("/api/feed/all/",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({feed:data});
            console.log({feed:data});
        }).sort({_id:-1})

    });
    app.get("/api/feed/all/limit/:num/",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({feed:data});
            console.log({feed:data});
        }).limit(Number(req.params.num)).sort({_id:-1});

    });
    app.get("/api/feed/store/:num/",function(req,res){
        Todo.find({storeid:req.params.num.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({feed:data});
            console.log({feed:data});
        }).sort({_id:-1});

    });
    app.delete("/api/feed/remove/:id", function (req, res) {
        Todo.findByIdAndDelete(
            req.params.id.replace(/\-/g, " "),
            function (err, data) {
                if (err) throw err;
                res.send({
                    product: data
                });
                //console.log({storename:req.params.name});
            })

    });
    app.post("/api/feed/addnew/",urlencodedParser,function(req,res){
        // data.push(req.body);
        // res.json(data);
         Todo(req.body).save(function(err,data){
             if (err)
             {
                 var response = {
                     "result":{
                     "responsecode":0,
                      "status":"Error found"
                     }
                  }
                  res.json(response);
             }
             else{
                 var response = {
                     "result":{
                     "responsecode":1,
                      "status":"Added Succesfully"
                     }
                  }
                  res.json(response);
             }

             });

     });
     app.post("/api/feed/images/addnew", urlencodedParser, function (req, res) {
         // data.push(req.body);
         // res.json(data);
         Todo.findOne({
             $and: [{
                 _id: req.body.feedid.replace(/\-/g, " ")
             }]
         }, function (err, data) {
             if (err) throw err;
             if (data == null) {
                  var response = {
                      "result": {
                          "responsecode": 0,
                          "status": "not found"
                      }
                  }
                  res.json(response);
             } else {
                 data.images.push({url:req.body.url});
                 data.save()
                 var response = {
                     "result": {
                         "responsecode": 1,
                         "status": "Added"
                     }
                 }
                 res.json(response);
             }

             //console.log({storename:req.params.name});
         })


         // console.log({todos:req.body});
     });
     app.delete("/api/feed/images/remove/:id/:name", urlencodedParser, function (req, res) {
         // data.push(req.body);
         // res.json(data);
         Todo.findOne({
             $and: [{
                 _id: req.params.id.replace(/\-/g, " ")
             }]
         }, function (err, data) {
             if (err) throw err;
             if (data == null) {
                 var response = {
                     "result": {
                         "responsecode": 0,
                         "status": "not found"
                     }
                 }
                 res.json(response);
             } else {
                 data.images.pull({_id:req.params.name});
                 data.save()
                 var response = {
                     "result": {
                         "responsecode": 1,
                         "status": "removed"
                     }
                 }
                 res.json(response);
             }

             //console.log({storename:req.params.name});
         })


         // console.log({todos:req.body});
     });
app.post("/api/feed/videos/addnew", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.body.feedid.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {
            data.videos.push({
                url: req.body.url
            });
            data.save()
            var response = {
                "result": {
                    "responsecode": 1,
                    "status": "Added"
                }
            }
            res.json(response);
        }

        //console.log({storename:req.params.name});
    })


    // console.log({todos:req.body});
});
app.delete("/api/feed/videos/remove/:id/:name", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.params.id.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {
            data.videos.pull({
                _id: req.body.url
            });
            data.save()
            var response = {
                "result": {
                    "responsecode": 1,
                    "status": "removed"
                }
            }
            res.json(response);
        }

        //console.log({storename:req.params.name});
    })


    // console.log({todos:req.body});
});
app.post("/api/feed/likes/addnew", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.body.feedid.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {
            data.likes.push({
                userid: req.body.user
                //comment: req.body.comment,
               // created: req.body.created
            });
           
            data.save(function (err) {
                if (err) {
                    throw err;
                }
                var ree = data.likes.$pop(); 
                res.json({idy:ree});
            })
            
           
           
        }

        //console.log({storename:req.params.name});
    })


    // console.log({todos:req.body});
});
app.delete("/api/feed/likes/remove/:id/:name", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.params.id.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {

            data.likes.pull({
                 _id: req.params.name
               // comment: req.params.name
                // created: req.body.created
            });
            data.save()
            var response = {
                "result": {
                    "responsecode": 1,
                    "status": "removed"
                }
            }
            res.json(response);
        }

        //console.log({storename:req.params.name});
    })


    // console.log({todos:req.body});
});

app.get("/api/feed/likes/view/:id/", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.params.id.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {

            res.send({likes:data.likes});
            
        }

    }).sort({_id:-1});


    // console.log({todos:req.body});
});


app.post("/api/feed/comments/addnew", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.body.feedid.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {
            data.comments.push({
                userid: req.body.user,
                comment:req.body.comment,
                created:req.body.created
            });
            data.save()
            var response = {
                "result": {
                    "responsecode": 1,
                    "status": "Added"
                }
            }
            res.json(response);
        }

        //console.log({storename:req.params.name});
    })


    // console.log({todos:req.body});
});
app.delete("/api/feed/comments/remove/:id/:name", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.params.id.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {

            data.comments.pull({
               // userid: req.body.user,
                _id: req.params.name
               // created: req.body.created
            });
            data.save()
            var response = {
                "result": {
                    "responsecode": 1,
                    "status": "removed"
                }
            }
            res.json(response);
        }

        //console.log({storename:req.params.name});
    })


    // console.log({todos:req.body});
});
app.get("/api/feed/comments/view/:id/", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.params.id.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {

            res.send({comments:data.comments});
            
        }

    }).sort({_id:-1});


    // console.log({todos:req.body});
});

     app.get("/api/feed/all/details/",function(req,res){
        Todo.aggregate([
            { $lookup:
               {
                 from: 'stores',
                 localField: 'storeid',
                 foreignField: '_id',
                 as: 'Feedetails'
               }
             }
            ]).exec(function(err, results){
                res.send({
                    product: results
                });
            console.log(results);
        })
    })
}