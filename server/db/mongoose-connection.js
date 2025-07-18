import mongoose from 'mongoose';

const uri = process.env.ATLAS_URI || "";

try {
    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });

    console.log("Mongoose successfully connected to MongoDB!");
} catch (err) {
    console.error("Mongoose connection error:", err);
}

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

export default mongoose.connection;