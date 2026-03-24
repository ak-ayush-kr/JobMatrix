import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    }, 
    location: {
        type: String,
    },
    logo: {
        type: String,
        default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{timestamps: true}); 

export const Company = mongoose.model('Company', companySchema);