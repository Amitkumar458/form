const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const yourdata = require("./src/models");
const staticpath = path.join(__dirname , "../public");
const template = path.join(__dirname , "../template/views");
const partialpath = path.join(__dirname , "../template/partials");
require("./src/conn");

var PORT = process.env.PORT || 3000;
// built in middleware
app.use(express.static(staticpath)); 
app.set("views" , template);
app.set("view engine" , "hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
hbs.registerPartials(partialpath);

app.post("/register" , async(req , res) => {
    try {
      const postdata = new yourdata({
        "firstname":`${req.body.firstname}`,
        "lastname":`${req.body.lastname}`,
        "email":`${req.body.email}`,
        "password":`${req.body.password}`,
        "address1":`${req.body.address}`,
        "address2":`${req.body.address2}`,
        "city":`${req.body.city}`,
        "country":`${req.body.country}`
      });
      const savedata = await postdata.save();
      res.send(`<h1>Your form is submitted</h1>
           <div>Your name = ${savedata.firstname} ${savedata.lastname}</div>
           <div>Your Email = ${savedata.email}</div>
           <div>Your Password = ${savedata.password}</div>
           <div>Your Address1 = ${savedata.address1}</div>
           <div>Your Address2 = ${savedata.address2}</div>
           <div>Your City = ${savedata.city}</div>
           <div>Your Country = ${savedata.country}</div>
      `);
      console.log(savedata);
    } catch (err) {
       console.log(err);
    }
});

app.get('/' , (req , res)=>{
   res.render("index.hbs");
});

app.get('/yourdata' , async(req , res)=>{
   try {

     const data = await yourdata.find();
     res.send(data);

   } catch (err) {

     console.log(err);

   }

})

app.listen(PORT , 'localhost' , () => {
       console.log(`server is running at http://localhost:${PORT}`);
});