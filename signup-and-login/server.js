const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3001;

//db connection
mongoose.connect('mongodb+srv://tarik-admin:aEdumaztV1CazT1O@cluster0.qqzjw.mongodb.net/usersDB?retryWrites=true&w=majority');

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

app.listen(port, function(){
    console.log("Server is running");
});