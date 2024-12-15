import mongoose, { Schema, model, models } from "mongoose";

interface IUser extends Document {
  user_username: string;
  user_email: string;
  user_password: string;
  user_avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
    user_username: {
        type: String,
        require: true,
    },
    user_email: {
        type: String,
        require: true
    },
    user_password: {
        type: String,
        require: true
    },
    user_avatar: {
        type:String,
        require: false,
        default: ""
    }
}, { timestamps: true })

const UserModel = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;