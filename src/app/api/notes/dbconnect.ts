import mongoose from "mongoose"

const db_uri = process.env.MONGODB_URI;
const connectDb = async () => {
    if(mongoose.connections[0].readyState) {
        return true;
    }
    try {
        await mongoose.connect(db_uri);
        console.log("Database Connected");
        return true;
    } catch (error) {
        console.error("Database Connection Error",error);
    }
}

export default connectDb;