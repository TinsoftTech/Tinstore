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
 var carouselSchema = new mongoose.Schema({
    name: String,
    imgurl: String,
});

var Carousel = mongoose.model('CarouselOptions', carouselSchema);
module.exports = function (app) {

    app.get("/api/carousel", function (req, res) {

        Carousel.find({}, function (err, data) {
            if (err) throw err;
            res.send({
                Carousel: data
            });
            //console.log({storename:req.params.name});
            console.log("Carousel");
        });

    });
    app.post("/api/carousel/add/", urlencodedParser, function (req, res) {
        // data.push(req.body);
        // res.json(data);
        Carousel(req.body).save(function (err, data) {
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
            //  res.render("Carousel",{Carousels:data});
            // console.log('image saved');
        });

        // console.log({Carousels:req.body});
    });
    // delete a store
    app.delete("/api/carousel/remove/:id", function (req, res) {
        Carousel.findById(
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
    app.put("/api/carousel/:id", urlencodedParser, function (req, res) {
        Carousel.findById(req.params.id.replace(/\-/g, " "), function (err, data) {

            if (err) throw err;
            //data.storename = req.body.storename;
            // data.storeid = req.body.storedescription;
            data.imgurl = req.body.imgurl;
            data.name = req.body.name;

            data.save(function (err) {
                if (err)
                    res.send(err);
                res.json(data);

            });



        });
    });

    //
    //  res.render("Carousel",{Carousels:data});

}