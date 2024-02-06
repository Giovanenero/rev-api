import mongoose from 'mongoose';
const { Schema } = mongoose;

const userVerificationSchema = new Schema({
    user_id: {
        type: String,
        require: true
    },
    unique_string: {
        type: String,
        require: true
    },
    expires_at: {
        type: Number,
        require: true
    },
});

export default mongoose.model('UserVerification', userVerificationSchema);