import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  owner: String,
  picsLiked: [{ type: Schema.Types.ObjectId, ref: 'Pic' }],
  picsOwn: [{ type: Schema.Types.ObjectId, ref: 'Pic' }],
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
});

UserSchema.pre('save', async (next) => {
  const user = this;
  try {
    if (user) {
      if (!user.isModified('password')) return next();

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      return next();
    }
  } catch (error) {
    throw new Error(`salt and hash error: ${error}`);
  }
  return next();
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
