
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
 var productsSchema = new mongoose.Schema({

    name:String,
    description: String,
    category:String,
    price:Number,
    quantity: Number,
    images:[{url:String}],
    storeid:String,
    dateadded: String
    });

var  Todo = mongoose.model('Products',productsSchema);
module.exports = function (app) {
    app.get("/api/products/all/",function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.send({product:data});
            //console.log({product:data});
        }).sort({_id:-1})

    });
     app.get("/api/products/limit/:num", function (req, res) {

         Todo.find({}, function (err, data) {
             if (err) throw err;
             res.send({
                 product: data
             });
             console.log({
                 product: data
             });

         }).limit(Number(req.params.num)).sort({_id:-1});

     });
app.get("/api/products/limit/:num/:sk/", function (req, res) {

         Todo.find({}, function (err, data) {
             if (err) throw err;
             res.send({
                 product: data
             });
             console.log({
                 product: data
             });

         }).skip(Number(req.params.sk)).limit(Number(req.params.num)).sort({_id:-1});

     });
    app.get("/api/products/view/:name", function (req, res) {
        Todo.findById(
            req.params.name.replace(/\-/g, " "), function (err, data) {
            if (err) throw err;
            res.send({
                product: data
            });
            //console.log({storename:req.params.name});
        })

    });

    app.get("/api/products/search/:name/",function(req,res){
        Todo.find({name:{'$regex': req.params.name.replace(/\-/g," "), '$options': 'i'}},function(err,data){
            if (err) throw err;
            res.send({product:data});
//console.log({storename:req.params.name});
        })

    });
    app.delete("/api/products/remove/:id", function (req, res) {
        Todo.findByIdAndDelete(
            req.params.id.replace(/\-/g, " "), function (err, data) {
            if (err) throw err;
            res.send({
                product: data
            });
            //console.log({storename:req.params.name});
        })

    });
//show a single product /search for products
    app.get("/api/products/category/:name/limit/:num",function(req,res){
        Todo.find({category:req.params.name.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({product:data});
//console.log({storename:req.params.name});
        }).limit(Number(req.params.num)).sort({_id:-1})

    });
 app.get("/api/products/category/:name/",function(req,res){
        Todo.find({category:req.params.name.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({product:data});
//console.log({storename:req.params.name});
        })

    });
    app.get("/api/products/store/:name/limit/:num", function (req, res) {
        Todo.find({
            storeid: req.params.name.replace(/\-/g, " ")
        }, function (err, data) {
            if (err) throw err;
            res.send({
                product: data
            });
            //console.log({storename:req.params.name});
        }).limit(Number(req.params.num)).sort({_id:-1})

    });
     app.get("/api/products/store/:storename/category/:name/limit/:num", function (req, res) {
         Todo.find({
                     $and: [{
                         storeid: req.params.storename.replace(/\-/g, " ")
                     }, {
                         category: req.params.category.replace(/\-/g, " ")
                     }]
                 }, function (err, data) {
             if (err) throw err;
             res.send({
                 product: data
             });
             //console.log({storename:req.params.name});
         }).limit(Number(req.params.num)).sort({_id:-1})

     });
//create a store
    app.post("/api/products/addnew/",urlencodedParser,function(req,res){
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
                 res.json({ id: data._id });
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

        //update a store
        app.post("/api/products/images/addnew", urlencodedParser, function (req, res) {
            // data.push(req.body);
            // res.json(data);
            Todo.findOne({
                $and: [{
                    _id: req.body.productid.replace(/\-/g, " ")
                }]
            }, function (err, data) {
                if (err) throw err;
                if (data == null) {
                    var response = {
                        "result": {
                            "responsecode": 0,
                            "status": "not found"
                        }
                    }
                    res.json(response);
                } else {
                    data.images.push({
                        url: req.body.url

                    });
                    data.save()
                    var response = {
                        "result": {
                            "responsecode": 1,
                            "status": "Added"
                        }
                    }
                    res.json(response);
                }

                //console.log({storename:req.params.name});
            })


            // console.log({todos:req.body});
        });
app.delete("/api/products/images/remove/:id/:name", urlencodedParser, function (req, res) {
    // data.push(req.body);
    // res.json(data);
    Todo.findOne({
        $and: [{
            _id: req.params.id.replace(/\-/g, " ")
        }]
    }, function (err, data) {
        if (err) throw err;
        if (data == null) {
            var response = {
                "result": {
                    "responsecode": 0,
                    "status": "not found"
                }
            }
            res.json(response);
        } else {

            data.images.pull({
                _id: req.params.name
                // comment: req.params.name
                // created: req.body.created
            });
            data.save()
            var response = {
                "result": {
                    "responsecode": 1,
                    "status": "removed"
                }
            }
            res.json(response);
        }

        //console.log({storename:req.params.name});
    })


    // console.log({todos:req.body});
});

    app.put("/api/products/update/:productid",urlencodedParser,function(req,res){
            Todo.findById(req.params.productid.replace(/\-/g," "),function(err,data){

                if (err) throw err;
                //data.storename = req.body.storename;
               // data.storeid = req.body.storedescription;
                 data.category = req.body.category;
                data.name = req.body.name;
                data.price = req.body.price;
                data.quantity = req.body.quantity;
                data.description = req.body.description;
                data.save(function(err) {
                if (err)
                {
                    var response = {
                        "result":{
                        "responsecode":0,
                         "status":"error found"
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
               // res.send(err);
               // res.json(data);

            });



                });
            });
    app.put("/api/products/updateqty/:productid", urlencodedParser, function (req, res) {
        Todo.findById(req.params.productid.replace(/\-/g, " "), function (err, data) {

            if (err) throw err;
            //data.storename = req.body.storename;
            // data.storeid = req.body.storedescription;
           // data.name = req.body.name;
           // data.price = req.body.price;
            data.quantity = data.quantity - req.body.quantity;
            // data.description = req.body.description;
            data.save(function (err) {
                if (err) {
                    var response = {
                        "result": {
                            "responsecode": 0,
                            "status": "error found"
                        }
                    }
                    res.json(response);
                } else {
                    var response = {
                        "result": {
                            "responsecode": 1,
                            "status": "updated succesfully"
                        }
                    }
                    res.json(response);
                }
                // res.send(err);
                // res.json(data);

            });



        });
    });

       //
      //  res.render("todo",{todos:data});

}
