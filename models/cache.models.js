import mongoose from "mongoose";
/**
 * User Schema
 */
const cacheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  timeToLive: {
    type: Date
  }
});
export default mongoose.model('Cache', cacheSchema);