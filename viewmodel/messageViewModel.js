var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var mongoose = require("mongoose");
const Ask = require('./buyersViewModel');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:'+encodeURIComponent("G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==")+'@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@tinsoft@&retrywrites=false',{ useNewUrlParser: true },function(err,db){
    if(err){
     console.log(err);
   }else {
       console.log('connected to the Test db');
   }
 });
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 var messageSchema = new mongoose.Schema({
    conversationid:String,
    message: String,
    storeid: String,
    buyerid: String,
    senderid: String,
    sentstatus:String,
    readstatus:String,
    dateadded: String
});

var Message = mongoose.model('Message', messageSchema);
module.exports = function (app) {
    //show all stores

    //show a single store /search for store
    app.get("/api/messages/conversation/:id/", function (req, res) {

        Message.find({conversationid:req.params.id}, function (err, data) {
            if (err) throw err;
            res.send({
                Message: data
            });
            //console.log({storename:req.params.name});
            console.log("Message");
        });

    });

    
    app.get("/api/messages/count/",function(req,res){
        Message.estimatedDocumentCount({readstatus:0}).exec((err, count) => {
            if (err) {
                res.send(err);
                return;
            }
        
            res.json({ count: count });
        });

    });
    
    app.get("/api/messages/limit/:num/",function(req,res){
        Message.find({},function(err,data){
            if (err) throw err;
            res.send({Message:data});
           // console.log({store:data});
        }).limit(Number(req.params.num)).sort({_id:-1});

    });
    app.post("/api/messages/add/", urlencodedParser, function (req, res) {
       
        Message(req.body).save(function (err, data) {
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
    app.delete("/api/messages/remove/:id", function (req, res) {
        Message.findById(req.params.id).deleteOne(function (err, data) {

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
    app.put("/api/messages/updatemessage/:id",urlencodedParser,function(req,res){
        Message.findById(req.params.id.replace(/\-/g," "),function(err,data){
         if (err) throw err;
         if(data==null){
            var response = {
                "result":{
                "responsecode":0,
                 "status":"not found"
                }
             }
             res.json(response);
         }
         else{
            data.readstatus = 1;

            data.save(function(err) {
            if (err)
            res.send(err);
            var response = {
                "result":{
                    "responsecode":1,
                 "status":"updatedd"
                }
             }
             res.json(response);

        });
         }
     })

     }); 
    

}
