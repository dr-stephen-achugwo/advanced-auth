const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your username'],
            trim: true,
            minlength: [3, 'Your username must be at least 3 characters'],
            maxlength: [30, 'Your username must be at most 30 characters'],
            index: true
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minlength: [8, 'Your password must be at least 8 characters'],
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Passwords are not the same'
            }
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: String,
            default: null
        },
        otpExpires: {
            type: Date,
            default: null
        },
        resetPasswordOTP: {
            type: String,
            default: null
        },
        resetPasswordOTPExpires: {
            type: Date,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
);

// password is hashed==========
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

// compater user password with hashed password ==========
userSchema.methods.correctPassword = async function (password, userPassword) {
    return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
