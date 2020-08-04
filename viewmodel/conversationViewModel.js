var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:'+encodeURIComponent("G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==")+'@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@tinsoft@&retrywrites=false',{ useNewUrlParser: true },function(err,db){
    
if(err){
     console.log(err);
   }else {
       console.log('connected to the Test db');
   }
 }); 
 var conversationSchema = new mongoose.Schema({
    storeid: String,
    buyerid: String,
});

var Conversations = mongoose.model('Conversation', conversationSchema);
module.exports = function (app) {
    //show all stores

    //show a single store /search for store
    app.get("/api/conversations", function (req, res) {

        Conversations.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                Conversations: data
            });
            //console.log({storename:req.params.name});
            console.log("Conversations");
        });

    });
    
    app.get("/api/conversations/count/",function(req,res){
        Conversations.estimatedDocumentCount({}).exec((err, count) => {
            if (err) {
                res.send(err);
                return;
            }
        
            res.json({ count: count });
        });

    });
    
    app.get("/api/conversations/limit/:num/",function(req,res){
        Conversations.find({},function(err,data){
            if (err) throw err;
            res.send({Conversations:data});
           // console.log({store:data});
        }).limit(Number(req.params.num)).sort({_id:-1});

    });
    app.post("/api/conversations/add/", urlencodedParser, function (req, res) {
        // data.push(req.body);
        // res.json(data);
        Conversations(req.body).save(function (err, data) {
            if (err) {
                var response = {
                    "result": {
                        "responsecode": 0,
                        "status": " Error"
                    }
                   
                }
                console.log(err);
            } else {
                var response = {
                    "result": {
                        "responsecode": 1,
                        "status": "Added Succcessfully"
                    }
                }
            }
            res.json(response);
            //  res.render("Category",{Categorys:data});
            // console.log('image saved');
        });

        // console.log({Categorys:req.body});
    });
    // delete a store
    app.delete("/api/conversations/remove/:id", function (req, res) {
        Conversations.findById(req.params.id).deleteOne(function (err, data) {

            if (err) {
                var response = {
                    "result": {
                        "responsecode": 0,
                        "status": "Error"
                    }
                }
            } else {
                var response = {
                    "result": {
                        "responsecode": 1,
                        "status": "Removed Succesfully"
                    }
                }
            }
            res.json(response)


        })
    });

    //update a store
    app.get("/api/conversations/store/:id/",function(req,res){
        Conversations.find({storeid:req.params.id.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({Conversations:data});
           // console.log({feed:data});
        }).sort({_id:-1});

    });
    app.get("/api/conversations/buyer/:id/",function(req,res){
        Conversations.find({storeid:req.params.id.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({Conversations:data});
           // console.log({feed:data});
        }).sort({_id:-1});

    });

    //
    //  res.render("Category",{Categorys:data});

}
