const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const { render } = require('ejs');


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/groceryDB",{useNewUrlParser:true,useUnifiedTopology:true});

const grocerySchema=new mongoose.Schema({
    name:String
})

const GroceryItem=new mongoose.model("GroceryItem",grocerySchema);

app.get("/",function(req,res){
     const date=new Date();
     const currentDay=date.toDateString();
     GroceryItem.find({},function(err,items){
         if(!err)
         {
            res.render("list",{day:currentDay,items:items});
         }
     })
})

app.post("/",function(req,res){
    const itemName=req.body.item;
   /*if(itemName=="")
    {
            popupS.window({
                mode: 'alert',
                content: 'Enter a valid Item Name'
            });
       
    }*/
    
        const item=new GroceryItem({
            name:itemName
        })
        item.save(function(err){
            if(!err)
            {
                res.redirect("/");
            }
        });
})

app.post("/delete",function(req,res){
    const id=req.body.checkbox;
    GroceryItem.deleteOne({_id:id},function(err){
        if(err)
        {
            console.log("Error occurred");
        }
        else{
            res.redirect("/");
          
        }
    })

})

app.listen("3000",function(req,res){
    console.log("Server started running on port 3000");
})