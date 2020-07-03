
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
 var notificationSchema = new mongoose.Schema({
  
    content:String,
    storeid:String,
    productid:String,
    status:Number,
    dateadded: String
    
    
   
    });
   
var  Todo = mongoose.model('Notification',notificationSchema); 
/*var itemOne = Todo({
                    url:"C:\Users\Toshiba\Desktop\folder\background\boot.jpg",
                    storename:"SPL Stores",
                    feedid:"5c50b3d5c9931a0850761d94",
                    storeid:"5c50b3d5c9931a0850761d94"
                
                    }).save(function(err){
            if (err) throw err;
             console.log('image saved');
});*/
module.exports = function (app) {
    //show all stores
   
//show a single store /search for store
app.get("/api/notifications/",function(req,res){
    Todo.find({},function(err,data){
        if (err) throw err;
        res.send({notifications:data});
//console.log({storename:req.params.name});
    })

});
    
app.get("/api/notifications/view/:id",function(req,res){
    Todo.find({$and:[{storeid:req.params.id.replace(/\-/g," ")},{status:1}]},function(err,data){
        if (err) throw err;
        res.send({notifications:data});
//console.log({storename:req.params.name});
    })

});
//create a store
app.post("/api/notifications/addnew/",urlencodedParser,function(req,res){
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
        // throw err;
        // res.json(data);
       //  res.render("todo",{todos:data});
       //  console.log('product saved');
         });
//updateQuantity("5d6116d1b113ab21b440bac8", 4);
    // console.log({todos:req.body});
 });
// delete a store
    app.delete("/api/notifications/remove/:id",function(req,res){
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
        app.put("/api/notifications/update/:id",urlencodedParser,function(req,res){
            Todo.findById(req.params.id.replace(/\-/g," "),function(err,data){
    
                if (err) throw err;
                //data.storename = req.body.storename;
               // data.storeid = req.body.storedescription;
                data.status = 2;
               
                data.save(function(err) {
                if (err)
                res.send(err);
                res.json(data);
            
            });
               
                
                
                });
            });
            
        //update a store
    
       //
      //  res.render("todo",{todos:data});
    
}
