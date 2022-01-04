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

//Routes


//data model
const User = mongoose.model("User", userSchema);

app.listen(port, function(){
    console.log("Server is running");
});