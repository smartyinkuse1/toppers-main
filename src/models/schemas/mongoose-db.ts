import mongoose from 'mongoose';

export const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        return conn;

    } catch (error) {
        console.log(error);
        
    }
}

