import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: 'admin',
    },
    password: {
        type: String,
        required: true,
        default: 'admin@123',
    },
    adminToken: {
        type: String,
    },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;