var express = require("express");
//const multer = require('multer');
//const upload = multer({dest: __dirname + '/uploads/images'});
var storeViewModel = require("./viewmodel/storeViewModel");
var bankViewModel = require("./viewmodel/bankViewModel");
var buyersViewModel = require("./viewmodel/buyersViewModel");
var productsViewModel = require("./viewmodel/productsViewModel");
var productsdescriptionViewModel = require("./viewmodel/productsdescriptionViewModel");
var ordersViewModel = require("./viewmodel/ordersViewModel");
var categoryViewModel = require("./viewmodel/categoryViewModel");
var feedViewModel = require("./viewmodel/feedViewModel");
var featuredViewModel = require("./viewmodel/featuredViewModel");
var followViewModel = require("./viewmodel/followViewModel");
var notificationViewModel = require("./viewmodel/notificationViewModel");
var feedbackViewModel = require("./viewmodel/feedbacksViewModel");
var cartViewModel = require("./viewmodel/cartViewModel");
var carouselViewModel = require("./viewmodel/carouselViewModel");
var conversationViewModel = require("./viewmodel/conversationViewModel");
var  app = express();
//set up template engine
app.set("view engine","ejs");

//static files
app.use(express.static('./public'));

//fire viewmodel
app.get("/",function(req,res){
    res.render(__dirname+"/views/todo");

});
app.get("/upload-image",function(req,res){
    res.render(__dirname+"/views/upload-img");

});

/*app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});*/
storeViewModel(app);
bankViewModel(app);
buyersViewModel(app);
productsViewModel(app);
productsdescriptionViewModel(app);
ordersViewModel(app);
cartViewModel(app);
conversationViewModel(app);
carouselViewModel(app);
categoryViewModel(app);
feedViewModel(app);
featuredViewModel(app);
feedbackViewModel(app);
followViewModel(app);
notificationViewModel(app);
//set port
app.listen(process.env.PORT || 5000,function(){
   // console.log(updatejs.update("5d6116d1b113ab21b440bac8", 1));
console.log("now listening on port 5000");
});
