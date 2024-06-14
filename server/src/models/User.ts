import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  nickname: { type: String, required: true, unique: true },
});

const User = model('User', UserSchema);

export default User;
