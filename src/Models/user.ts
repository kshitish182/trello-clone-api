import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedOn: {
    type: String,
    default: Date.now(),
  },
  boards: {
    type: [String],
    default: [],
  },
});

export default mongoose.model('user', userSchema);
