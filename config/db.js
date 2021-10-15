//Install Mongoose (what's being used to connect)
const mongoose = require('mongoose') 
//Grab string from default.json by importing config
const config = require('config')
//To get MongoDB string from config file
const db = config.get('mongoURI')

//Create variable to call within server.js
const connectDB = async () => {
    //put async await inside try/catch block because if there's an error like we can't connect, then we need a way to have it fail and show the error message
    try {
        await  mongoose.connect(db, {
          
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        //log the error message
        console.error(err)
        //Exit process with failure
        process.exit(1);
    }       
}

    module.exports = connectDB;