var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://tinsoft:'+encodeURIComponent("G9TgJvTORPvhhipqxPw412PqjrbDJRZTwcuOXzBzlldlh7TjEKAq9ULeK4W4K1yqsyicO9EpMlXYruVboKcBdw==")+'@tinsoft.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@tinsoft@',{ useNewUrlParser: true },function(err,db){
    if(err){
     console.log(err);
   }else {
       console.log('connected to the Test db');
   }
 }); 
 var categorySchema = new mongoose.Schema({
    name: String,
    icon: String,
});

var Category = mongoose.model('Category', categorySchema);


//var Others = mongoose.model('OtherOptions', othersSchema);
/*var itemOne = Category({
                    url:"C:\Users\Toshiba\Desktop\folder\background\boot.jpg",
                    storename:"SPL Stores",
                    productid:"5c50b3d5c9931a0850761d94",
                    storeid:"5c50b3d5c9931a0850761d94"

                    }).save(function(err){
            if (err) throw err;
             console.log('image saved');
});*/
module.exports = function (app) {
    //show all stores

    //show a single store /search for store
    app.get("/api/category", function (req, res) {

        Category.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                Categories: data
            });
            //console.log({storename:req.params.name});
            console.log("Category");
        });

    });
    app.post("/api/category/add/", urlencodedParser, function (req, res) {
        // data.push(req.body);
        // res.json(data);
        Category(req.body).save(function (err, data) {
            if (err) {
                var response = {
                    "result": {
                        "responsecode": 0,
                        "status": " Error"
                    }
                }
            } else {
                var response = {
                    "result": {
                        "responsecode": 1,
                        "status": "Added Succcessfully"
                    }
                }
            }
            res.json(response);
            //  res.render("Category",{Categorys:data});
            // console.log('image saved');
        });

        // console.log({Categorys:req.body});
    });
    // delete a store
    app.delete("/api/category/remove/:id", function (req, res) {
        Category.findById(
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

    //update a store
    app.put("/api/category/:id", urlencodedParser, function (req, res) {
        Category.findById(req.params.id.replace(/\-/g, " "), function (err, data) {

            if (err) throw err;
            //data.storename = req.body.storename;
            // data.storeid = req.body.storedescription;
            data.icon = req.body.icon;
            data.name = req.body.name;

            data.save(function (err) {
                if (err)
                    res.send(err);
                res.json(data);

            });



        });
    });

    //
    //  res.render("Category",{Categorys:data});

}