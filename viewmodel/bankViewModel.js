
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@tinsoft@');
var bankSchema = new mongoose.Schema({
    storeid:String,
    bankname:String,
    nuban:String,
    accountname:String,
    balance:Number
    });

var  Todo = mongoose.model('Banks',bankSchema);
 /*itemOne = Todo({storename:"SPL Stores",
                    storeid:"5c50b3d5c9931a0850761d94",
                    bankname:"Guaranty Trust Bank",
                    nuban:"0168977375",
                    accountname:"Fadipe victor foluso",
                    balance:15000
                    }).save(function(err){
            if (err) throw err;
             console.log('bank saved');
});
*/
module.exports = function (app) {
    //show all stores
    app.get("/api/banks",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({bank:data});
            console.log({bank:data});
        })

    });
//show a single store /search for store
    app.get("/api/banks/:storeid",function(req,res){
        Todo.find({storeid:req.params.storeid.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({bank:data});
//console.log({storename:req.params.name});
        })

    });
    app.post("/api/banks/createaccount",urlencodedParser,function(req,res){
        // data.push(req.body);
        // res.json(data);
        Todo.findOne({$and:[{storeid:req.body.storeid.replace(/\-/g," ")}]},function(err,data){
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
                 "status":"Account Exist Already"
                }
             }
             res.json(response);
             console.log('bank saved');
         }

 //console.log({storename:req.params.name});
     })


        // console.log({todos:req.body});
     });

// delete a store
    app.delete("/api/banks/remove/:storeid",function(req,res){
        Todo.find({storeid:req.params.storeid.replace(/\-/g," ")}).remove(function(err,data){

            if (err) throw err;
            res.json(data)


            })
        });

        //update a store
    app.put("/api/banks/updatebankdetails/:storeid",urlencodedParser,function(req,res){
            Todo.findOne({$and:[{storeid:req.params.storeid.replace(/\-/g," ")}]},function(err,data){

                if (err) throw err;
                //data.storename = req.body.storename;
               // data.storeid = req.body.storedescription;
                data.bankname = req.body.bankname;
               // data.email = req.body.email;
                data.nuban = req.body.nuban;
                data.accountname = req.body.accountname;
                data.save(function(err) {
                if (err)
               {
                var response = {
                    "result":{
                     "responsecode":0,
                     "status":"Error"
                    }
                 }
                 res.json(response);
               }
               else{
                var response = {
                    "result":{
                     "responsecode":1,
                     "status":"Updated"
                    }
                 }
                 res.json(response);
               }

            });



                });
            });

       //
      //  res.render("todo",{todos:data});
      app.put("/api/banks/updatebalance/:storeid",urlencodedParser,function(req,res){
        Todo.findOne({$and:[{storeid:req.params.storeid.replace(/\-/g," ")}]},function(err,data){

            if (err) throw err;
            //data.storename = req.body.storename;
           // data.storeid = req.body.storedescription;
           // data.bankname = req.body.bankname;
           // data.email = req.body.email;
           // data.nuban = req.body.nuban;
            data.balance = req.body.balance;
            data.save(function(err) {
            if (err)
           {
            var response = {
                "result":{
                 "responsecode":0,
                 "status":"Error"
                }
             }
             res.json(response);
           }
        else{
            var response = {
                "result":{
                 "responsecode":0,
                 "status":"Updated"
                }
             }
             res.json(response);
        }
        });



            });
        });


}