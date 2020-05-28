
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/tinstoreapp');
var cartSchema = new mongoose.Schema({
    buyerid:String,
    productid:String,
    quantity:String,
    color:String,
    size:String,
    status:String
    });

var  Todo = mongoose.model('Cart',cartSchema);

module.exports = function (app) {
    //show all stores
    app.get("/api/cart",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({cart:data});
            console.log({cart:data});
        })

    });
//show a single store /search for store
    app.get("/api/cart/buyer/:buyerid",function(req,res){
        Todo.find({buyerid:req.params.buyerid.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({cart:data});
//console.log({storename:req.params.name});
        })

    });
    app.post("/api/cart/addtocart",urlencodedParser,function(req,res){
        // data.push(req.body);
        // res.json(data);
        Todo.findOne({$and:[{buyerid:req.body.buyerid.replace(/\-/g," ")},{productid:req.body.productid.replace(/\-/g," ")}]},function(err,data){
         if (err) throw err;
         if(data==null){
             Todo(req.body).save(function(err,data){
                 if (err) throw err;
                 var response = {
                     "result":{
                     "responsecode":1,
                      "status":"Added Successfully"
                     }
                  }
                  res.json(response);
                 });
         }
         else{
             var response = {
                "result":{
                 "responsecode":0,
                 "status":"Product Exist Already"
                }
             }
             res.json(response);
            // console.log('Added Succesfully');
         }

 //console.log({storename:req.params.name});
     })


        // console.log({todos:req.body});
     });

// delete a store
    app.delete("/api/cart/removefromcart/:id",function(req,res){
        Todo.find({_id:req.params.id.replace(/\-/g," ")}).remove(function(err,data){

            if (err) {
            var response = {
                "result":{
                "responsecode":0,
                 "status":"not found"
                }
             }
             res.json(response);
            // throw err;
            }
             else   {
                var response = {
                    "result":{
                    "responsecode":1,
                     "status":"deleted successfully"
                    }
                 }
                 res.json(response);
             }
           // res.json(data)


            })
        });

        //update a store
    app.put("/api/cart/updatestatus/:id",urlencodedParser,function(req,res){
            Todo.findOne({$and:[{_id:req.params.id.replace(/\-/g," ")}]},function(err,data){

                if (err) throw err;
                //data.storename = req.body.storename;
               // data.storeid = req.body.storedescription;
                data.status = req.body.status;
               // data.email = req.body.email;
               // data.nuban = req.body.nuban;
               // data.accountname = req.body.accountname;
                data.save(function(err) {
                if (err){
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
                         "status":"updated succesfully"
                        }
                     }
                     res.json(response);
                }
              //  res.send(err);
               // res.json(data);

            });



                });
            });

       //
      //  res.render("todo",{todos:data});

}