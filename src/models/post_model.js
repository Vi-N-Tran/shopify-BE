import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  cost: Number,
  images: String,
  location: String,
  availableRoom: Number,
  commonSpace: String,
  area: Number,
  description: String,
  closeTo: String,
}, {
  toJSON: {
    virtuals: true,
  },
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
