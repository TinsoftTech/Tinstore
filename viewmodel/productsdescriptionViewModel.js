
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var mongoose =require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/tinstoreapp');
var productsdescriptionSchema = new mongoose.Schema({
    productid:String,
    description:[],
    colors:[],
    sizes:[]
    });

var  Todo = mongoose.model('ProductsDescription',productsdescriptionSchema);
module.exports = function (app) {

     app.delete("/api/productsdescription/remove/:id", function (req, res) {
        Todo.findByIdAndDelete(
            req.params.id.replace(/\-/g, " "), function (err, data) {
            if (err) throw err;
            res.send({
                productsdescription: data
            });
            //console.log({storename:req.params.name});
        })

    });
//show a single product /search for products
    app.get("/api/productsdescription/:id/",function(req,res){
        Todo.find({productid:req.params.id.replace(/\-/g," ")},function(err,data){
            if (err) throw err;
            res.send({productsdescription:data});
//console.log({storename:req.params.name});
        });

    });
    app.post("/api/productsdescription/addnew/",urlencodedParser,function(req,res){
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

            });

    });

}