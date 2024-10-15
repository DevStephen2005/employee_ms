const mongoose = require('mongoose')

const connectDB = async() => {
    try{

        await mongoose.connect(process.env.MONGODB_URL)
        .then((con) => console.log("Mongoose connected to the host : "+con.connection.host))
        .catch(err => console.log(err))
    }
    catch(error){
        console.log(error)
    }
}

module.exports = connectDB;