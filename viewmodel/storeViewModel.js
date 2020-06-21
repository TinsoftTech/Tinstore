
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:'+encodeURIComponent("G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==")+'@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@tinsoft@',{ useNewUrlParser: true },function(err,db){
    if(err){
     console.log(err);
   }else {
       console.log('connected to the Test db');
   }
 }); 
 var storeSchema = new mongoose.Schema({
    storename:String,
    storedescription:String,
    logo:String,
    email:String,
    phone: String,
    address:String,
    state:String,
    country:String,
    status:Boolean,
    password: String
    });

var  Todo = mongoose.model('Stores',storeSchema);
 /* itemOne = Todo({storename:"SPL Stores",
                    storedescription:"We sellgood quality clothes",
                    logo:"",
                    email:"spl@gmail.com",
                    number:09065345678,
                    balance:1000
                    address:"No 16 odoona complex ibadan",
                    state:"oyo",
                    country:"Nigeria",

                    status:true}).save(function(err){
            if (err) throw err;
             console.log('store saved');
});
*/
module.exports = function (app) {
    //show all stores
    app.get("/api/stores/all/",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({store:data});
console.log({store:data});
        }).sort({_id:-1})

    });
    app.get("/api/store/all/limit/:num/",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({store:data});
            console.log({store:data});
        }).limit(Number(req.params.num)).sort({_id:-1});

    });

    app.post("/api/stores/login",urlencodedParser,function(req,res){
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
                    "status":"Login Successfull"
                   }
                }
            }
            res.json(response);
//console.log({storename:req.params.name});
        })
         // console.log({todos:req.body});
     });
//show a single store /search for store
    app.get("/api/stores/view/:id",function(req,res){
        Todo.findById(
            req.params.id.replace(/\-/g, " "),function(err,data){
            if (err) throw err;
            res.send({store:data});
//console.log({storename:req.params.name});
        })

    });
//show a single store /search for store
    app.get("/api/stores/search/:storename",function(req,res){
        Todo.find({storename:req.params.storename.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({store:data});
//console.log({storename:req.params.name});
        })

    });
//create a store
    app.post("/api/stores/createaccount/",urlencodedParser,function(req,res){
       // data.push(req.body);
       // res.json(data);
       Todo.findOne({$and:[{email:req.body.email.replace(/\-/g," ")},{storename:req.body.storename.replace(/\-/g," ")}]},function(err,data){
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
                "status":"Store Exist Already"
               }
            }
            res.json(response);
        }

//console.log({storename:req.params.name});
    })



       // console.log({todos:req.body});
    });
// delete a store
    app.delete("/api/stores/removeaccount/:id",function(req,res){
        Todo.find({_id:req.params.id.replace(/\-/g," ")}).remove(function(err,data){

            if (err)
            {
                var response = {
                    "result":{
                    "responsecode":0,
                     "status":"error"
                    }
                 }
                 res.json(response);

            }
            else{
                var response = {
                    "result":{
                    "responsecode":1,
                     "status":"deleted Successfully"
                    }
                 }
                 res.json(response);

            }
           // throw err;
           // res.json(data)


            })
        });

        //update
    app.put("/api/stores/updateinfo/:storeid",urlencodedParser,function(req,res){
            Todo.findById(req.params.storeid.replace(/\-/g," "),function(err,data){

                if (err) throw err;
                data.storename = req.body.storename;
                data.storedescription = req.body.storedescription;
                data.logo = req.body.logo;
                data.email = req.body.email;
                data.number = req.body.number;
                data.address = req.body.address;
                data.state = req.body.state;
                data.country = req.body.country;
               // data.balance = req.body.balance;
                data.status = req.body.status;
                data.save(function(err) {
                if (err)
                res.send(err);
                res.json(data);

            });



                });
            });

       //
      //  res.render("todo",{todos:data});

}
//module.exports = mongoose.model('users', storeSchema);