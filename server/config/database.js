const mongoose=require("mongoose");

require('dotenv').config();

const dbConnect=() => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);

    });
}

module.exports=dbConnect;