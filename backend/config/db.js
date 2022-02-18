const mongoose = require("mongoose")

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONG0_URI)
        console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline);
    }catch(e){
        console.log(e);
        process.exit(1) //exit the process with failure ie. 1
    }
}

module.exports = connectDB