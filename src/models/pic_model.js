import mongoose, { Schema } from 'mongoose';

const PicSchema = new Schema({
  image: String,
  title: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toJSON: {
    virtuals: true,
  },
  timestamps: true,
});

const PicModel = mongoose.model('Pic', PicSchema);

export default PicModel;
