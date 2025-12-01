import mongoose from "mongoose";

const subsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        trim: true,
        uppercase: true,
        enum: ['USD', 'EUR', 'GBP', 'INR'] ,
        default: 'INR'
    },
    frequency: {
        type: String,
        required: [true, 'Frequency is required'],
        enum: ['monthly', 'yearly', 'weekly'],
        default: 'monthly'
    },
    category: {
        type: String,
        trim: true,
        maxLength: 50,
        enum: ['entertainment', 'education', 'productivity', 'health', 'other'],
        default: 'other'
    },
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, 'Payment method is required'],
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'other'],
        default: 'other'
    },
    staus: {
        type: String,
        trim: true,
        enum: ['active', 'inactive', 'canceled', 'paused'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        default: Date.now,
        validate: {
            validator: function(value) {
                return value <= new Date();
            }
        }
    },
    renewalDate: {
        type: Date,
        required: [true, 'Renewal date is required'],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            }
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
        index: true
    }
}, {
    timestamps: true
});
// auto calculate renewalDate before saving
subsSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            'monthly': 30,
            'yearly': 365,
            'weekly': 7,
            'daily': 1
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    // auto update the status if renewalDate has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subs = mongoose.model('Subs', subsSchema);
export default Subs;