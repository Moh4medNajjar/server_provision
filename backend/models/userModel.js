const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    position: { type: String, required: true, enum: ['Developer', 'Tester', 'Manager', 'DevOps', 'Support'] },
    matricule: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    // role: { type: String, enum: ['GeneralSpecAdmin', 'NetworkAdmin', 'SecurityAdmin', 'SuperAdmin', ''], default: '' },
    role: { type: String, enum: ['GeneralSpecAdmin', 'NetworkAdmin', 'SecurityAdmin', 'SuperAdmin', ''], default: '' },
    permissions: {
        type: [String],
        // enum: ['CREATE_USER', 'DELETE_USER', 'createRequest', 'approveRequest', 'assignNetwork', 'checkSecurity', 'triggerPlaybooks', 'manageUsers', 'viewLogs'],
        default: []
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
