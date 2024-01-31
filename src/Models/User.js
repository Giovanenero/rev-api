import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: false,
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: false
    },
    birthday: {
        type: Number,
        require: true
    }
});

export default mongoose.model('User', userSchema);