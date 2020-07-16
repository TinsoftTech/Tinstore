
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:'+encodeURIComponent("G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==")+'@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@tinsoft@&retrywrites=false',{ useNewUrlParser: true },function(err,db){
    if(err){
     console.log(err);
   }else {
       console.log('connected to the Test db');
   }
 }); 
 var followSchema = new mongoose.Schema({
    user:String,
    storeid:String,
    
    });
   
var  Todo = mongoose.model('Follow',followSchema); 

module.exports = function (app) {
    //show all stores
   
//show a single store /search for store
app.get("/api/follows/",function(req,res){
    Todo.find({},function(err,data){
        if (err) throw err;
        res.send({follows:data});
//console.log({storename:req.params.name});
    })

});
app.get("/api/follow/view/store/:id",function(req,res){
    Todo.find({storeid:req.params.id.replace(/\-/g," ")},function(err,data){
        if (err) throw err;
        res.send({follow:data});
//console.log({storename:req.params.name});
    })

});
app.get("/api/follow/view/user/:id",function(req,res){
    Todo.find({user:req.params.id.replace(/\-/g," ")},function(err,data){
        if (err) throw err;
        res.send({follow:data});
//console.log({storename:req.params.name});
    })

});

app.get("/api/follow/check/:user/:store/",urlencodedParser,function(req,res){
    // data.push(req.body);
    // res.json(data);
    Todo.find({$and:[{user:req.params.user.replace(/\-/g," ")},{storeid:req.params.store.replace(/\-/g," ")}]},function(err,data){
        if (err) throw err;
        res.send({follow:data});
      //  res.send({follow:data});
//console.log({storename:req.params.name});
    })
     
//updateQuantity("5d6116d1b113ab21b440bac8", 4);
    // console.log({todos:req.body});
 });
    
   app.delete("/api/follow/remove/:user/:storeid",urlencodedParser,function(req,res){
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({$and:[{user:req.params.user.replace(/\-/g," ")},{storeid:req.params.storeid.replace(/\-/g," ")}]}).remove(function(err,data){

                if (err) 
                {
                    var response = {
                        "result":{
                         "responsecode":0,   
                         "status":"Error"
                        }
                     }
                }
                else{
                    var response = {
                        "result":{
                         "responsecode":1,   
                         "status":"Removed Succesfully"
                        }
                     }
                }
                res.json(response)
                
                
                }) 
//updateQuantity("5d6116d1b113ab21b440bac8", 4);
    // console.log({todos:req.body});
 });  
            
       
        
//create a store
app.post("/api/follow/addnew/",urlencodedParser,function(req,res){
    // data.push(req.body);
    // res.json(data);
    Todo.find({$and:[{user:req.body.user.replace(/\-/g," ")},{storeid:req.body.storeid.replace(/\-/g," ")}]},function(err,data){
        if (err) throw err;
        if (data == "") {
            Todo(req.body).save(function(err,data){
                if (err)
                {
                    var response = {
                        "result":{
                        "responsecode":0,
                         "status":"Error founddd"
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
               // throw err;
               // res.json(data);
              //  res.render("todo",{todos:data});
              //  console.log('product saved');
                });
        }
      //  res.send({follow:data});
//console.log({storename:req.params.name});
    })
     
//updateQuantity("5d6116d1b113ab21b440bac8", 4);
    // console.log({todos:req.body});
 });
// delete a store
    app.delete("/api/follow/remove/:id",function(req,res){
        Todo.findById(req.params.id.replace(/\-/g," ")).remove(function(err,data){

            if (err) 
            {
                var response = {
                    "result":{
                     "responsecode":0,   
                     "status":"Error"
                    }
                 }
            }
            else{
                var response = {
                    "result":{
                     "responsecode":1,   
                     "status":"Removed Succesfully"
                    }
                 }
            }
            res.json(response)
            
            
            })
        });

        //update a store
    
       //
      //  res.render("todo",{todos:data});
    
}
