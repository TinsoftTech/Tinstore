
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/tinstoreapp');
var orderSchema = new mongoose.Schema({
    buyerid:String,
    productid:String,
    productname:String,
    price:String,
    quantity: Number,
    address:String,
    state:String,
    country:String,
    phone:String,
    datepaid:{type:Date,default:Date.now},
    status:Number
    });

var  Todo = mongoose.model('Orders',orderSchema);
 /*itemOne = Todo({storename:"SPL Stores",
                    storeid:"5c50b3d5c9931a0850761d94",
                    bankname:"Guaranty Trust Bank",
                    nuban:"0168977375",
                    accountname:"Fadipe victor foluso",
                    balance:15000
                    }).save(function(err){
            if (err) throw err;
             console.log('bank saved');
});*/
module.exports = function (app) {
    //show all stores
    app.get("/api/orders",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({order:data});
            console.log({order:data});
        });
  //console.log(productsViewModel.update("5d6116d1b113ab21b440bac8", 1));
      //

    });
//show a single store /search for store
    app.get("/api/order/buyer/:buyerid",function(req,res){
        Todo.find({buyerid:req.params.buyerid.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({order:data});
//console.log({storename:req.params.name});
        })

    });
    app.post("/api/order/place",urlencodedParser,function(req,res){
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
                 // UpdateProductCount(req.body.productid);
                 });
         }
         else{
             var response = {
                "result":{
                 "responsecode":0,
                 "status":"Exist Already"
                }
             }
             res.json(response);
             console.log('Added Succesfully');
         }

 //console.log({storename:req.params.name});
     })


        // console.log({todos:req.body});
     });

// delete a store

        //update a store
    app.put("/api/order/updatestatus/:id",urlencodedParser,function(req,res){
            Todo.findOne({$and:[{id:req.body.id.replace(/\-/g," ")}]},function(err,data){

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