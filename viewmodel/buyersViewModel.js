
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:'+encodeURIComponent("G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==")+'@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@tinsoft@&retrywrites=false',{ useNewUrlParser: true },function(err,db){
    if(err){
     console.log(err);
   }else {
       console.log('connected to the Test db');
   }
 }); 
var buyerSchema = new mongoose.Schema({
    fullname:String,
    avatar:String,
    email:String,
    password:String,
    gender:String,
    phone:String,
    address:String,
    state:String,
    country:String,
    active:String,
    created:String
    });

var  Todo = mongoose.model('Buyers',buyerSchema);
/* var itemOne = Todo({fullname:"Adeleke Rukayat",

                    email:"adeleke@gmail.com",
                    password:"@Hidemyass2",

                    gender:"Female",
                    phone:09065345678,
                    address:"No 16 odoona complex ibadan",
                    state:"oyo",
                    country:"Nigeria",

                    status:true}).save(function(err){
            if (err) throw err;
             console.log('buyer saved');
}); */
module.exports = function (app) {
    //show all stores
       app.get("/api/buyers",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({buyers:data});
console.log({buyers:data});
        }).sort({"created":-1})

    });
    function check (){
        Todo.find({}, function (err, data) {
            if (err) throw err;

            console.log({
                buyers: data
            });
        }).sort({
            "createdAt": -1
        })
    }
//show a single store /search for store
    app.get("/api/buyers/:email",function(req,res){
        Todo.findOne({email:req.params.email.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({buyers:data});
//console.log({storename:req.params.name});
        })

    });
    app.get("/api/buyers/id/:id",function(req,res){
        Todo.findById(req.params.id.replace(/\-/g," "),function(err,data){
            if (err) throw err;
            res.send({buyers:data});
//console.log({storename:req.params.name});
        })

    });
app.delete("/api/buyers/remove/:id", function (req, res) {
        Todo.findById(
            req.params.id).deleteOne(function (err, data) {

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

    app.post("/api/buyers/login",urlencodedParser,function(req,res){
        // data.push(req.body);
        // res.json(data);

        Todo.findOne({$and:[{email:req.body.email.replace(/\-/g," ")},{password:req.body.password.replace(/\-/g," ")}]},function(err,data){
            if (err) throw err;
            if(data==null){
                var response = {
                    "result":{
                     "responsecode":0,
                     "status":"Login Error"
                    }

                 }
            }
            else{
                var response = {
                   "result":{
                    "responsecode":1,
                    "status":"Login Sccessfull"
                   }
                }
            }
            res.json(response);
           // check();
//console.log({storename:req.params.name});
        })
         // console.log({todos:req.body});
     });
//create a store
    app.post("/api/buyers/createaccount",urlencodedParser,function(req,res){
       // data.push(req.body);
       // res.json(data);
       Todo.findOne({$and:[{email:req.body.email.replace(/\-/g," ")}]},function(err,data){
        if (err) throw err;
        if(data==null){
            Todo(req.body).save(function(err,data){
                if (err) throw err;
                var response = {
                    "result":{
                    "responsecode":1,
                     "status":"Saved Successfully"
                    }
                 }
                 res.json(response);
                });
        }
        else{
            var response = {
               "result":{
                "responsecode":0,
                "status":"User Exist Already"
               }
            }
            res.json(response);
        }

//console.log({storename:req.params.name});
    })


       // console.log({todos:req.body});
    });
// delete a store
    app.delete("/api/buyers/:email",function(req,res){
        Todo.find({email:req.params.email.replace(/\-/g," ")}).remove(function(err,data){

            if (err) throw err;
            res.json(data)


            })
        });

   app.put("/api/buyers/updateavatar/:id",urlencodedParser,function(req,res){
            Todo.findById(req.params.id.replace(/\-/g," "),function(err,data){

                if (err) throw err;
                if(data == null)
                    {
                        var response = {
                            "result":{
                             "responsecode":0,
                             "status":"User not found"
                            }
                         }
                         res.json(response);
                    }
                    else
                    {

                        data.avatar = req.body.avatar;
                        

                        data.save(function(err) {
                        if (err)
                        res.send(err);
                        var response = {
                            "result":{
                             "responsecode":1,
                             "status":"Details Updated Successfully"
                            }
                         }
                         res.json(response);
                       // res.json(data);






                });
            }
            });

        //update
   app.put("/api/buyers/:id",urlencodedParser,function(req,res){
            Todo.findById(req.params.id.replace(/\-/g," "),function(err,data){

                if (err) throw err;
                if(data == null)
                    {
                        var response = {
                            "result":{
                             "responsecode":0,
                             "status":"User not found"
                            }
                         }
                         res.json(response);
                    }
                    else
                    {

                        data.fullname = req.body.fullname;
                        data.email = req.body.email;
                        data.phone = req.body.phone;
                        data.address = req.body.address;
                        data.state = req.body.state;
                        data.country = req.body.country;
			data.gender=req.body.gender;
                      

                        data.save(function(err) {
                        if (err)
                        res.send(err);
                        var response = {
                            "result":{
                             "responsecode":1,
                             "status":"Details Updated Successfully"
                            }
                         }
                         res.json(response);
                       // res.json(data);






                });
            }
            });



                app.put("/api/buyers/updatepassword/:id",urlencodedParser,function(req,res){
                    // data.push(req.body);
                    // res.json(data);
                    Todo.findById(req.params.id.replace(/\-/g," "),function(err,data){
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
                        data.password = req.body.password;

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

             //console.log({storename:req.params.name});
                 })


                    // console.log({todos:req.body});
                 });

       //
      //  res.render("todo",{todos:data});
                });
}
