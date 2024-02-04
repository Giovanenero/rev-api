import mongoose from 'mongoose'

import env from "dotenv"
env.config();

// Mongodb Atlas
// Username: giovane
// Password: ej6CYazBz25yZfFc

async function connectDatabase(){
    await mongoose.connect(process.env.CONNECT_DB)
}

export default connectDatabase;