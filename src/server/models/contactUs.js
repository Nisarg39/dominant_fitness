import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const ContactUs = mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;