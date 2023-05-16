const mongoose = require('mongoose');

const connectDB = async () => {

    // Mongodb Connection
    
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected Successfuly to Database ${con.connection.name}`)
    } 

    // Mongodb Connection Failed
    
    catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;