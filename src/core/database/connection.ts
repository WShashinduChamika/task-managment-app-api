import mongoose from "mongoose";

const state: { initialized: boolean } = { initialized: false };

export const getConnection = async (): Promise<void> => {
    if (!state.initialized) {
        const uri = process.env.MONGODB_URI || "";
        await mongoose.connect(uri);
        state.initialized = true;
        console.log("MongoDB connection established");
    }
};

export const closeConnection = async (): Promise<void> => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
        console.log("MongoDB connection closed");
    }
};