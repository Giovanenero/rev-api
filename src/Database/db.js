import mongoose from 'mongoose'

// Mongodb Atlas
// Username: giovane
// Password: ej6CYazBz25yZfFc

async function connectDatabase(){
    await mongoose.connect('mongodb+srv://giovane:ej6CYazBz25yZfFc@cluster0.ntfo0db.mongodb.net/?retryWrites=true&w=majority')
}

export default connectDatabase;