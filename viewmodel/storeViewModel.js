
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
    app.get("/api/stores/all/limit/:num/",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({store:data});
            console.log({store:data});
        }).limit(Number(req.params.num)).sort({_id:-1});

    });

   //module.exports = mongoose.model('users', storeSchema);
