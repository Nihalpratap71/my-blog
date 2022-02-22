const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
// const res = require("express/lib/response"); // ye kis liye ?
// const { use } = require("express/lib/application");

// middlewares

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/testBlogDB");

// make schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase:[true,"should be in lowercase only"]
  },
  content: {
    type: String,
    required: true,
    unique: true,
    minlength:10
  }
});
const Blog = new mongoose.model("blog", blogSchema);
// signup schema
const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    unique:true,
  }
})
const User = new mongoose.model("user",userSchema);


app.route("/").get((req, res) => {
  res.render("home"); 
});
app.route("/about").get((req, res) => {
  res.render("about");
});

app.route("/signup").get((req, res) => {
  res.render("signup");
})

.post((req,res)=>{
  var user = new User({
    email:req.body.email,
    password:req.body.password
  });
  user.save((err)=>{
    if(!err){
      console.log("item save successfully")
    }
    res.redirect("/blog")
  })
})

// .post((req,res)=>{
//   var user = new User({
//     email:req.body.email,
//     password:req.body.password
//   });
//   user.save((err)=>{
//     if(!err){
//       console.log("item saved successfully")
//     }
//     res.redirect("/blog")
//   })
// })

app.route("/login").get((req,res)=>{
  res.render("login")
});
app.post("/login",(req,res)=>{
  console.log(req.body.email);
  console.log(req.body.password)

  res.redirect("/")
})

// app.route("/blogs").get((req, res) => {
//   Blog.find({}, (err, result) =>  {
//     if (!err) {
//       res.render("blogs", {
//         result: result,
//       });
//     } else {
//       console.log(err);
//     }
//   });
// });

app.route("/blogs").get((req,res)=>{
  Blog.find({},(err,result)=>{
    if(!err){
      res.render("blogs",{
        result: result,
      });
    } else{
      console.log(err);
    }
  });
});

app
  .route("/blog")
  .get((req, res) => {
    res.render("blog")
  })

  // .post((req,res)=>{
  //   var blog = new Blog({
  //     title: req.body.title,
  //     content: req.body.content
  //   });
  //   // item1.save("/blogs"); // ye route kyu likha h aapne yha ?
  //   blog.save((err) => {
  //     if (!err) {
  //       console.log("item saved successfully");
  //     }
  //   });
    
  //   res.redirect("/blogs");
    
  // });
.post((req,res)=>{
  var blog = new Blog({
    title:req.body.title,
    content:req.body.content
  });
  blog.save((err)=>{
    if(!err){
      console.log("item saved successfully")
    }
  });
  res.redirect("/blogs")
})

app.listen(3000, (req, res) => {
  console.log("server started on port : 3000");
});



