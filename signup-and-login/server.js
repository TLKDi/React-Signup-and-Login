const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3001;

//config
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended: false}));

//db connection
mongoose.connect("mongodb+srv://tarik-admin:aEdumaztV1CazT1O@cluster0.qqzjw.mongodb.net/usersDB?retryWrites=true&w=majority")
.then(console.log("DB connected"))
.catch(err => console.log(err));

//data schema
const userSchema  = {
    vorname : String, 
    nachname: String, 
    alter: Number, 
    email: String, 
    passwort: String
} 

//data model
const User = mongoose.model("User", userSchema);

//Routes
app.get('/users', (req, res) => {
    User.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json("Error: " + err));
});

app.post('/newUser', (req,res) => {
    const newUser = new User({
        vorname : req.body.vorname, 
        nachname: req.body.nachname, 
        alter: req.body.alter, 
        email: req.body.email, 
        passwort: req.body.passwort
    });
    newUser.save()
    .then((item) => console.log(item))
    .catch(err => res.status(400).json("Error: " + err));

});

app.listen(port, function(){
    console.log("Server is running");
});