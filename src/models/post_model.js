import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  createdAt: Date,
}, {
  toJSON: {
    virtuals: true,
  },
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
